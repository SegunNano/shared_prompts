import connectDB from "@config/db";
import Prompt from "@models/promptModel";

const GET = async (req, res) => {
    try {
        await connectDB();
        const prompts = await Prompt.find({}).populate('author');
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response('Failed to fetch all prompts!', { status: 500 });
    }
};

export { GET };