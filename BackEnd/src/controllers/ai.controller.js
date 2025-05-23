const { Configuration, OpenAIApi } = require("openai");
const { getPrompt } = require("../utils/prompt");
const { getReviewPrompt } = require("../utils/reviewPrompt");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const getAIResponse = async (req, res) => {
  try {
    const { code, language } = req.body;
    const prompt = getPrompt(code, language);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    
    // Fix: Use res.json() instead of directly writing to response
    res.json({ response: response.data.choices[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while processing your request" });
  }
};

const getAIReview = async (req, res) => {
  try {
    const { code, language } = req.body;
    const prompt = getReviewPrompt(code, language);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    res.json({ response: response.data.choices[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while processing your request" });
  }
};

module.exports = { getAIResponse, getAIReview };
