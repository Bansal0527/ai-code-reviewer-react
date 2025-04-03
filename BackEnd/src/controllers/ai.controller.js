const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv");
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const reviewCode = async (request, response) => {
  try {
    const { code } = request.body;
    
    if (!code) {
      return response.status(400).json({ error: "Code is required" });
    }

    const completion = await openai.createChatCompletion({
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

    // Use response.json instead of response.send to safely return data
    return response.status(200).json({ 
      result: completion.data.choices[0].message.content 
    });
  } catch (error) {
    console.error("Error reviewing code:", error);
    return response.status(500).json({ 
      error: "An error occurred while reviewing the code" 
    });
  }
};

module.exports = { reviewCode };
