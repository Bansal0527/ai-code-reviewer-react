const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY } = require("../config/config");

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const getReview = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ error: "Code is required" });
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a senior software engineer. Review the following code and provide feedback on potential bugs, security issues, and improvements.",
        },
        {
          role: "user",
          content: code,
        },
      ],
      max_tokens: 1000,
    });

    // Safely return the response as JSON instead of directly writing to response
    return res.json({ review: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error in getReview:", error);
    return res.status(500).json({ error: "Failed to get review" });
  }
};

module.exports = {
  getReview,
};
