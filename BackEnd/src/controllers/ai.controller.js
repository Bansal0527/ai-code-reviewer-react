const { Configuration, OpenAIApi } = require("openai");
const { getPrompt } = require("../utils/prompt");
const { getFileExtension } = require("../utils/fileExtension");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const reviewCode = async (req, res) => {
  try {
    const { code, fileName } = req.body;
    const fileExtension = getFileExtension(fileName);
    const prompt = getPrompt(code, fileExtension);
    
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    
    // Fix: Use res.json() instead of directly writing to response
    res.json({ 
      success: true, 
      data: response.data.choices[0].message.content 
    });
  } catch (error) {
    console.error("Error reviewing code:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error reviewing code", 
      error: error.message 
    });
  }
};

module.exports = {
  reviewCode,
};
