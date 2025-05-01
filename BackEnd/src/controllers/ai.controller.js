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
            "You are a code reviewer. Review the following code and provide feedback.",
        },
        {
          role: "user",
          content: code,
        },
      ],
    });

    // Return JSON response instead of directly writing to response
    res.json({
      success: true,
      data: response.data.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error reviewing code",
      error: error.message,
    });
  }
};

module.exports = {
  reviewCode,
};
