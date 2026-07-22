import express from "express";
import Groq from "groq-sdk";
import Batch from "../models/Batch.js";

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/insights", async (req, res) => {
  try {
    // 1️⃣ Database se batch records fetch karo
    const batches = await Batch.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    // 2️⃣ Agar koi batch nahi hai
    if (batches.length === 0) {
      return res.json({
        summary: "No historical batch data available.",
        predictedYield: 0,
        lowYieldMessage: "No batch records available.",
        alerts: [
          "📂 Add more batch records to generate AI insights."
        ],
        chartData: [],
      });
    }

    // 3️⃣ Batch data ko AI ke liye readable format mein convert karo
    const batchData = batches.map((batch) => ({
      batchId: batch.batchId,
      plantVariety: batch.plantVariety,
      yield: Number(batch.yield),
      harvestDate: batch.harvestDate,
      distillationDate: batch.distillationDate,
      status: batch.status,
    }));
const totalYield = batchData.reduce(
  (sum, batch) => sum + batch.yield,
  0
);

const averageYield =
  totalYield / batchData.length;

const predictedYield =
  Math.round(averageYield);

const lowYieldBatches = batchData.filter(
  (batch) =>
    batch.yield < averageYield * 0.8
);

const lowYieldMessage =
  lowYieldBatches.length > 0
    ? `Low yield detected in batch(es): ${lowYieldBatches
        .map((batch) => batch.batchId)
        .join(", ")}`
    : "No abnormal yield detected.";

const alerts =
  lowYieldBatches.length > 0
    ? [
        `⚠ Low yield detected in batch(es): ${lowYieldBatches
          .map((batch) => batch.batchId)
          .join(", ")}`,
      ]
    : ["✅ No abnormal yield detected."];
    // 4️⃣ AI ko instruction
    const prompt = `
You are Herbal AI, an AI analytics assistant for a Herbal Batch Traceability System.

Analyze the following real batch records:

${JSON.stringify(batchData, null, 2)}

Return a clear analysis containing:

1. Average yield
2. Expected yield for the next batch
3. Low yield batch detection
4. Important alerts
5. Short summary

IMPORTANT:
- Use only the provided batch data.
- Do not invent batch IDs or yield values.
- If there is not enough data, clearly mention it.
- Keep the answer concise and useful for a dashboard.
`;

    // 5️⃣ Actual AI API call
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // 6️⃣ AI response
    const aiReply =
      completion.choices[0].message.content;

    // 7️⃣ Frontend ko response
   res.json({
  success: true,

  insight: aiReply,

  averageYield: Number(
    averageYield.toFixed(2)
  ),

  predictedYield,

  lowYieldMessage,

  alerts,

  chartData: batchData.map((batch) => ({
    batchId: batch.batchId,
    yield: batch.yield,
  })),
});
  } catch (error) {
    console.error("AI Insights Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to generate AI insights.",
    });
  }
});

export default router;