const { Configuration, OpenAIApi } = require("openai");
const { getPrompt } = require("../utils/prompt");
const { getReviewPrompt } = require("../utils/reviewPrompt");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateCode = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: getPrompt(),
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 2048,
    });

    res.json({
      code: completion.data.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error generating code:", error);
    res.status(500).json({ error: "Failed to generate code" });
  }
};

const reviewCode = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ error: "Code is required" });
    }

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: getReviewPrompt(),
        },
        { role: "user", content: code },
      ],
      temperature: 0.7,
      max_tokens: 2048,
    });

    res.json({
      review: completion.data.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error reviewing code:", error);
    res.status(500).json({ error: "Failed to review code" });
  }
};

module.exports = {
  generateCode,
  reviewCode,
};
