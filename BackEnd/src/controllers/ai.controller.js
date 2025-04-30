const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv");
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateReview = async (req, res) => {
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
          content:
            "You are a senior software engineer. You are reviewing code for a junior developer. Be kind and helpful. Provide constructive feedback and suggestions for improvement.",
        },
        {
          role: "user",
          content: `Please review the following code:\n\n${code}`,
        },
      ],
    });

    const review = completion.data.choices[0].message.content;
    return res.json({ review });
  } catch (error) {
    console.error("Error generating review:", error);
    return res.status(500).json({ error: "Failed to generate review" });
  }
};

module.exports = {
  generateReview,
};
