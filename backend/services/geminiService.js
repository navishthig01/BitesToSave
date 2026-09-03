const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const generateFoodDescription = async (foodName) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: `Write a short, clear food donation description for: ${foodName}. Keep it suitable for an NGO food-sharing platform.`
        });

        return response.text;
    } catch (error) {
        console.error("Gemini error:", error.message);
        throw new Error("Failed to generate AI food description");
    }
};

module.exports = {
    generateFoodDescription
};