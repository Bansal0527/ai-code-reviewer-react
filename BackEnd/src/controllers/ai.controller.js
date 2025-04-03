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
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Review the following code and provide feedback on potential bugs, security issues, and improvements:\n\n${code}`,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    
    // Use res.json instead of res.send to safely return the response
    res.json({ review: response.data.choices[0].text });
  } catch (error) {
    console.error("Error generating review:", error);
    res.status(500).json({ error: "Failed to generate review" });
  }
};

module.exports = { generateReview };
