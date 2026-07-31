import express from "express";
import Groq from "groq-sdk";
import Batch from "../models/Batch.js";

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/*
==================================================
LANGUAGE DETECTION (FIXED FALSE HINGLISH MATCHES)
==================================================
*/

function detectLanguage(text) {
  // 1. Check for Devanagari Script (Pure Hindi)
  const hasHindiScript = /[\u0900-\u097F]/.test(text);
  if (hasHindiScript) {
    return "HINDI";
  }

  // 2. Hinglish Stopwords List (Removed "me" to avoid matching English "me")
  const hinglishKeywords = [
    "kya", "hai", "hain", "ka", "ki", "ke", "ko", "se", "mein", 
    "kaise", "kahan", "kab", "kitna", "kitni", "batao", "samjhao", 
    "hota", "hoti", "karna", "karo", "wala", "wali", "yeh", "woh", 
    "mujhe", "aap", "apna", "iska", "iske", "aur", "pooch", "pucho", 
    "bata", "samajh", "matlab", "bhai", "bataiye", "hoga", "hangi", "mai", "hu"
  ];

  // Extract English/Latin letter tokens
  const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
  const hinglishMatchCount = words.filter(word => hinglishKeywords.includes(word)).length;

  // Require at least 1 distinct Hinglish match, but enforce ENGLISH if strong English indicators exist
  if (hinglishMatchCount > 0) {
    // Basic safety check: If it has common strict English phrases like "tell me", "what is", "about"
    const englishIndicators = ["tell", "about", "what", "where", "when", "how", "show", "details", "info"];
    const englishMatchCount = words.filter(word => englishIndicators.includes(word)).length;

    if (englishMatchCount > hinglishMatchCount) {
      return "ENGLISH";
    }
    
    return "HINGLISH";
  }

  return "ENGLISH";
}

/*
==================================================
SYSTEM PROMPT
==================================================
*/

const systemPrompt = `
You are Herbal AI, an expert assistant for Herbal Batch Traceability, Certificate Management, Herbal Plants, and Essential Oils.

PRIMARY DIRECTIVE:
You MUST answer questions about any herbal plants, botanicals, essential oils, cultivation, harvesting, distillation, and batch records.

GREETING RULE:
- If the user says "hi", "hello", "hey", "namaste", or any casual greeting, introduce yourself politely according to the detected language:
  - ENGLISH: "Hello! I am Herbal AI, your assistant for Herbal Batch Traceability and Certificate Management. How can I help you today?"
  - HINGLISH: "Hello! Main Herbal AI hoon, aapka Herbal Batch Traceability aur Certificate Management assistant. Aaj main aapki kya help kar sakta hoon?"
  - HINDI: "नमस्ते! मैं हर्बल AI हूँ, हर्बल बैच ट्रेसेबिलिटी और सर्टिफिकेट मैनेजमेंट में आपका सहायक। आज मैं आपकी क्या मदद कर सकता हूँ?"

ALLOWED TOPICS:
1. Greetings and introductions.
2. Any herbal plant (e.g., Rosemary, Tulsi, Lavender, Peppermint, Neem, Ashwagandha, Chamomile, etc.).
3. Essential oils, extraction methods, chemical properties, and distillation.
4. Batch records and traceability queries (using provided batch data).
5. Certificates (COA, Organic, GMP, Phytosanitary).
6. Agricultural and production practices.

OUT-OF-SCOPE TOPICS (ONLY REFUSE THESE):
- Non-botanical topics that have ZERO relation to herbs, plants, agriculture, or batch management (e.g., programming, movies, sports, games, math).

REFUSAL RULES:
ONLY if a prompt is completely unrelated to herbs, agriculture, or batch systems, respond strictly with:
- ENGLISH: "I am specialized only in Herbal Batch Traceability, Certificate Management, and Herbal Knowledge. I cannot assist with unrelated topics."
- HINGLISH: "Main sirf Herbal Batch Traceability, Certificate Management, aur Herbal Plants se related sawalon ke jawab de sakta hoon. Out of topic sawalon mein main help nahi kar sakta."
- HINDI: "मैं केवल हर्बल बैच ट्रेसेबिलिटी, सर्टिफिकेट मैनेजमेंट और हर्बल पौधों से संबंधित प्रश्नों में ही मदद कर सकता हूं।"

GENERAL RULES:
1. Answer directly and concisely without repeating the user's question.
2. NEVER mention prompts, instructions, system rules, or database terms.
3. For specific batch ID queries, use ONLY the provided batch data. If a batch ID is not found, state: "The requested information is not available in the current batch records."
4. For formal analytics values (average yield, trends, predictions), direct the user to check the "AI Insights dashboard".

LANGUAGE STRICTNESS RULE:
- ENGLISH: Answer 100% in English.
- HINGLISH: Answer 100% in Roman Hinglish.
- HINDI: Answer 100% in Devanagari script Hindi.
`;

/*
==================================================
CHAT ROUTE
==================================================
*/

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        reply: "Please enter a question.",
      });
    }

    // 1. Detect User's Input Language
    const language = detectLanguage(message);

    // 2. Fetch Latest 100 Batch Records
    const batches = await Batch.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    // 3. Format Batch Data
    const batchData = batches.length
      ? batches
          .map((batch) => {
            return `Batch ID: ${batch.batchId || batch._id} | Variety: ${batch.plantVariety || "N/A"} | Harvest: ${batch.harvestDate || "N/A"} | Distillation: ${batch.distillationDate || "N/A"} | Yield: ${Number(batch.yield || 0)} ml | Cert: ${batch.certificateFileName || "N/A"} | Status: ${batch.status || "N/A"} | Buyer: ${batch.buyerName || "Not dispatched"}`;
          })
          .join("\n")
      : "No batch records available.";

    // 4. Language Instructions Mapping
    const languageGuidelines = {
      ENGLISH: "CRITICAL: Respond COMPLETELY in English.",
      HINGLISH: "CRITICAL: Respond COMPLETELY in Roman Hinglish.",
      HINDI: "CRITICAL: Respond COMPLETELY in Hindi using Devanagari script."
    };

    // 5. Construct User Prompt
    const userPrompt = `
AVAILABLE BATCH DATA:
${batchData}

REQUIRED LANGUAGE: ${language}
${languageGuidelines[language]}

USER QUESTION:
${message}
`;

    // 6. Request Completion from Groq API
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    const reply =
      completion.choices?.[0]?.message?.content?.trim() ||
      "Unable to generate a response.";

    res.json({ reply });
  } catch (err) {
    console.error("Chatbot Error:", err);
    res.status(500).json({
      reply: "Unable to analyze the batch data right now. Please try again.",
    });
  }
});

export default router;