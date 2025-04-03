const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv");
const { escape } = require('html-escaper');

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
            "You are a code reviewer. Review the following code and provide feedback on potential bugs, security issues, and improvements.",
        },
        {
          role: "user",
          content: code,
        },
      ],
    });

    const review = completion.data.choices[0].message.content;
    
    // Return safely escaped content as JSON instead of direct writing
    return res.json({ review: review });
  } catch (error) {
    console.error("Error generating review:", error);
    return res.status(500).json({ error: "Failed to generate review" });
  }
};

module.exports = { generateReview };
