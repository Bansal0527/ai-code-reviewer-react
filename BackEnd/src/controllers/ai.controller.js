const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY } = require("../config/config");
const { escapeHtml } = require("../utils/helpers");

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

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
          content:
            "You are a helpful code reviewer. Review the following code and provide feedback on how to improve it. Focus on security, performance, and best practices.",
        },
        {
          role: "user",
          content: code,
        },
      ],
    });

    const response = completion.data.choices[0].message.content;
    return res.json({ response: escapeHtml(response) });
  } catch (error) {
    console.error("Error reviewing code:", error);
    return res.status(500).json({ error: "Failed to review code" });
  }
};

module.exports = {
  reviewCode,
};
