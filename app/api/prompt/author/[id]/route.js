import connectDB from "@config/db";
import Prompt from "@models/promptModel";
import User from "@models/userModel";

const GET = async (req, { params }) => {

    try {
        await connectDB();
        const { id } = await params;
        if (!id) {
            return Response.json({ error: "Author not found" }, { status: 400 });
        }
        const prompts = await Prompt.find({ author: id }).populate('author');
        const user = await User.findById(id);
        return new Response(JSON.stringify({ prompts, user }), { status: 200 });
    } catch (error) {
        return new Response('Failed to fetch user prompts!', { status: 500 });
    }
};

export { GET };