import connectDB from "@config/db";
import Prompt from "@models/promptModel";


const POST = async (req, res) => {
    const { author, prompt, tag } = await req.json();
    try {
        console.log('object');
        await connectDB();
        const newPrompt = new Prompt({ author, tag, prompt });
        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
        console.log(error);
        return new Response('Failed to create prompt!', { status: 500 });
    }
};

export { POST };