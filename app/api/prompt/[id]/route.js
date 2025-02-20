import connectDB from "@config/db";
import Prompt from "@models/promptModel";

const GET = async (req, { params }) => {
    try {
        await connectDB();
        if (!params.id) {
            return Response.json({ error: "Author not found" }, { status: 400 });
        }
        const prompt = await Prompt.findById(params.id).populate('author');
        if (!prompt) return new Response('Prompt not found!', { status: 404 });
        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        return new Response('Failed to fetch prompt!', { status: 500 });
    }
};

const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json();

    try {
        await connectDB();
        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) return new Response('Prompt not found!', { status: 404 });

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (error) {
        return new Response('Failed to update prompt!', { status: 500 });
    }
};
const DELETE = async (req, { params }) => {
    const { id } = await params;
    try {
        await connectDB();
        await Prompt.findByIdAndDelete(id);

        return new Response("Prompt deleted succesfully", { status: 200 });
    } catch (error) {
        return new Response('Failed to delete prompt!', { status: 500 });
    }
};

export { GET, PATCH, DELETE };