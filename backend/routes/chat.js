import express from "express";
import Groq from "groq-sdk";

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


router.post("/", async (req, res) => {
  try {

    const { message } = req.body;

    const prompt = `
You are an AI assistant for a Herbal Traceability System.

Answer only about:
- Herbal plants
- Herbal batch traceability
- Certificates
- Essential oils
- Dispatch records
- Yield prediction
- Medicinal plants
- Sustainable farming

If the question is unrelated, politely say:
"I can only answer questions related to the Herbal Traceability System."

User:
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


    const reply =
      completion.choices[0].message.content;


    res.json({
      reply,
    });


  } catch (err) {

    console.log(err);

    res.status(500).json({
      reply: "Something went wrong.",
    });

  }
});


export default router;