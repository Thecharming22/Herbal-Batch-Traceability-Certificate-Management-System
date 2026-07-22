import express from "express";
import Groq from "groq-sdk";
import Batch from "../models/Batch.js";

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        reply: "Please enter a question.",
      });
    }

    // Fetch real batch data from MongoDB
    const batches = await Batch.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    // Convert MongoDB data into readable text
    const batchData = batches.length
      ? batches
          .map((batch) => {
            return `
Batch ID: ${batch.batchId || batch._id}
Plant Variety: ${batch.plantVariety}
Harvest Date: ${batch.harvestDate}
Distillation Date: ${batch.distillationDate}
Yield: ${batch.yield} ml
Certificate: ${batch.certificateFileName}
Status: ${batch.status}
Buyer: ${batch.buyerName || "Not dispatched"}
`;
          })
          .join("\n")
      : "No batch records are currently available.";

    const prompt = `
You are Herbal AI, an AI assistant for a Herbal and Aromatics Batch Traceability System.

You may answer questions related to:
- Herbal plants
- Herbal batch traceability
- Certificates
- Essential oils
- Dispatch records
- Yield analysis
- Yield prediction
- Medicinal plants
- Sustainable farming

IMPORTANT RULES:
1. Use the actual batch data provided below whenever the user asks about batches, yield, dispatch, or production.
2. Do not invent batch names, batch IDs, plants, yields, or percentages.
3. Do not mention data that is not present in the provided batch records.
4. If there is not enough data to answer, clearly say that more batch records are required.
5. Give clear and concise answers.
6. If the question is unrelated to the Herbal Traceability System, politely say:
"I can only answer questions related to the Herbal Traceability System."

ACTUAL BATCH DATA FROM DATABASE:
${batchData}

USER QUESTION:
${message}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const reply = completion.choices[0].message.content;

    res.json({
      reply,
    });
  } catch (err) {
    console.error("Chatbot Error:", err);

    res.status(500).json({
      reply:
        "Unable to analyze the batch data right now. Please try again.",
    });
  }
});

export default router;