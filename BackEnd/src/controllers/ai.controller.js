const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY } = require("../config/config");

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const reviewCode = async (req, res) => {
  try {
    const { code } = req.body;
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a senior software engineer. You need to review the code and provide feedback on how to improve it. Focus on best practices, code quality, and potential bugs.",
        },
        {
          role: "user",
          content: `Please review this code: ${code}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    // Instead of directly writing to response, send JSON data
    res.json({ 
      feedback: response.data.choices[0].message.content 
    });
  } catch (error) {
    console.error("Error reviewing code:", error);
    res.status(500).json({ error: "Failed to review code" });
  }
};

module.exports = {
  reviewCode,
};
