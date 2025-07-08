const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// HTML escape function to prevent XSS
function escapeHtml(unsafe) {
    if (typeof unsafe !== 'string') {
        return unsafe;
    }
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

const reviewCode = async (req, res) => {
    try {
        const { code } = req.body;
        
        if (!code) {
            return res.status(400).json({ error: "Code is required" });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const prompt = `Please review the following code and provide suggestions for improvement, potential bugs, and best practices:\n\n${code}`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Escape HTML content before sending response
        const escapedText = escapeHtml(text);
        
        res.setHeader('Content-Type', 'application/json');
        res.json({ review: escapedText });
        
    } catch (error) {
        console.error("Error reviewing code:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    reviewCode
};
