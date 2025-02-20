import connectDB from "@config/db";
import Prompt from "@models/promptModel";

const GET = async (req, { params: p }) => {

    try {
        await connectDB();
        const params = await p;
        if (!params.id) {
            return Response.json({ error: "Author not found" }, { status: 400 });
        }
        const prompts = await Prompt.find({ author: params.id }).populate('author');
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response('Failed to fetch user prompts!', { status: 500 });
    }
};

export { GET };