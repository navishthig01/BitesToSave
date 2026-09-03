require("dotenv").config();

const { generateFoodDescription } = require("./services/geminiService");

const testGemini = async () => {
    try {
        const description = await generateFoodDescription("Vegetable Rice");

        console.log("Gemini response:");
        console.log(description);
    } catch (error) {
        console.error("Test failed:", error.message);
    }
};

testGemini();