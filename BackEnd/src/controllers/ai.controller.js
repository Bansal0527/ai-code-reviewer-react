const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv");
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
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
            "You are a code reviewer. Review the following code and provide feedback on potential bugs, security issues, and improvements.",
        },
        {
          role: "user",
          content: code,
        },
      ],
    });

    // Safely return the response as JSON instead of directly writing to response
    return res.json({ 
      review: completion.data.choices[0].message.content 
    });
  } catch (error) {
    console.error("Error reviewing code:", error);
    return res.status(500).json({ error: "Failed to review code" });
  }
};

module.exports = {
  reviewCode,
};
