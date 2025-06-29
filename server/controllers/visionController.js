const { GoogleGenerativeAI } = require('@google/generative-ai');
// Initialize the Gemini AI SDK using the API key from .env
const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports = {
    // Method to generate up to 3 recepis from the ingredients of a given image
    async generateRecipes(req, res) {
        try {
            // Gets the image from the request (Multer populates req.file)
            const img = req.file;
            // If no image was uploaded, return a 400 error
            if (!img) return res.status(400).json({ error: "No image uploaded" });

            // Converts the image to base64 encoded string
            const base64ImageFile = img.buffer.toString('base64');

            // Contructs the request payload for Gemini
            const contents = [
                {   // Defines the message came from an user
                    role: 'user',
                    parts: [
                        // Attach the image to the prompt using inline data
                        {
                            inline_data: {
                                mime_type: img.mimetype, 
                                data: base64ImageFile, 
                            },
                        },
                        // Prompt requesting 3 possible dishes with a specific JSON structure
                        {
                            text: `Based on the ingredients you see in this image and common items, what are 3 dishes I could make? 
Please return the response as a JSON array with up to 3 objects. 
Each object should include "id", "name", "ingredients", and "instructions".`,
                        },
                    ],
                },
            ];

            // Selects the model that will be used for the generation
            const model = gemini.getGenerativeModel({ model: 'gemini-2.5-flash' });
            // Sends the request and awaits the result
            const result = await model.generateContent({ contents });
            // Extracts the response text from the result
            const response =  result.response;
            const text =  response.text();

            // Gemini formats JSON in markdown-like blocks (```json ... ```) so we extract the raw JSON
            const match = text.match(/```json\s*([\s\S]*?)\s*```/);

            // If no match or the group is empty, return an error
            if (!match || !match[1]) {
                return res.status(500).json({ error: 'Failed to extract JSON from Gemini response' });
            }

            
            try {
                // Parses and returns the extracted string into JSON
                return res.status(200).json({ recipes: JSON.parse(match[1]) });
            } catch (err) {
                console.error("Failed to parse JSON:", err);
                return res.status(500).json({ error: "Invalid JSON format returned by Gemini" });
            }

        } catch (err) {
            console.error('Error in generateRecipe:', err);
            res.status(500).json({ error: 'Something went wrong processing the image.' });
        }
    },
}