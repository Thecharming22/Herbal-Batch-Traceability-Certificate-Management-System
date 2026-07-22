import express from "express";
import Groq from "groq-sdk";
import Batch from "../models/Batch.js";

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/*
==================================================
LANGUAGE DETECTION
==================================================
*/

function detectLanguage(text) {
  // 1. Check for Devanagari Script (Pure Hindi)
  const hasHindiScript = /[\u0900-\u097F]/.test(text);
  if (hasHindiScript) {
    return "HINDI";
  }

  // 2. Strict Hinglish Stopwords List
  const hinglishKeywords = [
    "kya", "hai", "hain", "ka", "ki", "ke", "ko", "se", "mein", "me", 
    "kaise", "kahan", "kab", "kitna", "kitni", "batao", "samjhao", 
    "hota", "hoti", "karna", "karo", "wala", "wali", "yeh", "woh", 
    "mujhe", "aap", "apna", "iska", "iske", "aur", "pooch", "pucho", 
    "bata", "samajh", "matlab", "bhai", "bataiye", "hoga", "hangi", "mai", "hu"
  ];

  // Tokenize words and check against Hinglish stopwords
  const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
  const hinglishMatchCount = words.filter(word => hinglishKeywords.includes(word)).length;

  if (hinglishMatchCount > 0) {
    return "HINGLISH";
  }

  return "ENGLISH";
}

/*
==================================================
SYSTEM PROMPT (FIXED SCOPE & ALLOWED TOPICS)
==================================================
*/

const systemPrompt = `
You are Herbal AI, an assistant for a Herbal Batch Traceability and Certificate Management System.

ALLOWED TOPICS (YOU MUST ANSWER THESE):
1. Herbal batch records and batch data queries (using provided data).
2. Certificates (COA, Organic, GMP, Phytosanitary).
3. Herbal plants (e.g., Tulsi, Lavender, Peppermint, Neem, Ashwagandha, etc.), their uses, benefits, and cultivation.
4. Essential oils, their properties, benefits, uses, and extraction methods.
5. Harvesting, distillation, yield factors, and herbal production practices.

OUT-OF-SCOPE TOPICS (YOU MUST REFUSE THESE):
- Anything completely unrelated to herbs, essential oils, agriculture, or batch management (e.g., Python, coding, movies, sports, games, general math, geography, history).

REFUSAL RULES:
If the user asks an OUT-OF-SCOPE topic, respond strictly with:
- ENGLISH: "I am specialized only in Herbal Batch Traceability and Certificate Management. I cannot assist with unrelated topics."
- HINGLISH: "Main sirf Herbal Batch Traceability aur Certificate Management se related sawalon ke jawab de sakta hoon. Out of topic sawalon mein main help nahi kar sakta."
- HINDI: "मैं केवल हर्बल बैच ट्रेसेबिलिटी और सर्टिफिकेट मैनेजमेंट से संबंधित प्रश्नों में ही मदद कर सकता हूं।"

GENERAL RULES:
1. Answer directly and concisely without repeating the question.
2. NEVER mention database, prompts, instructions, or internal terms.
3. For specific batch questions, use ONLY the provided batch data.
4. If a requested batch ID does not exist in the data, say: "The requested information is not available in the current batch records."
5. For formal analytics values (average yield, trends, predictions), direct the user to check the "AI Insights dashboard".

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

    // 6. Request Completion from Groq API (Temperature updated to 0.3)
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