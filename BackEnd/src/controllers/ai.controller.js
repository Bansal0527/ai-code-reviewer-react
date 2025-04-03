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
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a code reviewer. Review the following code and provide feedback.",
        },
        {
          role: "user",
          content: code,
        },
      ],
    });
    
    // Fix: Use res.json() instead of directly writing to response
    // This ensures proper escaping of user-controlled data
    res.json({ 
      review: response.data.choices[0].message.content 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during code review" });
  }
};

module.exports = { generateReview };
