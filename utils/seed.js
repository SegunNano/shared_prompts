import Prompt from "@models/promptModel";
import mongoose from "mongoose";

import connectDB from "@config/db";
connectDB;
const seedPrompts = async () => {
    // Define the author IDs
    const author1 = new mongoose.Types.ObjectId('67b62acfe924decebaca5be3');
    const author2 = new mongoose.Types.ObjectId('67b77193e75ed9bc510494b8');

    // Create an array of prompt objects
    const prompts = [
        { prompt: 'Generate a creative story about a time-traveling explorer.', tag: 'storytelling', author: author1 },
        { prompt: 'Explain quantum physics in simple terms.', tag: 'education', author: author2 },
        { prompt: 'Compose a poem about the changing seasons.', tag: 'poetry', author: author1 },
        { prompt: 'Describe the benefits of meditation on mental health.', tag: 'wellness', author: author2 },
        { prompt: 'Write a dialogue between two characters in a dystopian future.', tag: 'dialogue', author: author1 },
        { prompt: 'Outline the key features of the Python programming language.', tag: 'programming', author: author2 },
        { prompt: 'Draft a letter to a friend describing your recent travels.', tag: 'letter', author: author1 },
        { prompt: 'Summarize the plot of a classic novel in 100 words.', tag: 'summary', author: author2 },
        { prompt: 'Create a list of tips for improving public speaking skills.', tag: 'self-improvement', author: author1 },
        { prompt: 'Discuss the impact of artificial intelligence on modern society.', tag: 'technology', author: author2 },
    ];

    try {
        // Insert the prompts into the database
        const result = await Prompt.insertMany(prompts);
        console.log('Prompts seeded successfully:', result);
    } catch (error) {
        console.error('Error seeding prompts:', error);
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
};

// Execute the seed function
export { seedPrompts };