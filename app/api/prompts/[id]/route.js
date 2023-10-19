import Prompt from "@models/prompt";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate("creator")
        if (!prompt) return new Response("Prompt Not Found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { prompt, tag, userId } = await request.json();

    // console.log('userId :>> ', userId);

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return new Response("Prompt not found", { status: 404 });
        }

        const existingUserIsPromptOwner = JSON.stringify(existingUser._id) === JSON.stringify(existingPrompt.creator);

        if (!existingUserIsPromptOwner) {
            return new Response("Prompt not found", { status: 404 });
        }

        // console.log('existingUserIsPromptOwner :>> ', existingUserIsPromptOwner);

        // Update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    // const { userId } = await request.json();
    // console.log('request :>> ', request);
    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id);

        // console.log('existingPrompt :>> ', existingPrompt);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        // const existingUser = await User.findById(userId);

        // console.log('existingUser :>> ', existingUser);

        // if (!existingUser) {
        //     return new Response("Prompt not found", { status: 404 });
        // }

        // const existingUserIsPromptOwner = JSON.stringify(existingUser._id) === JSON.stringify(existingPrompt.creator);

        // console.log('existingUserIsPromptOwner :>> ', existingUserIsPromptOwner);

        // if (!existingUserIsPromptOwner) {
        //     return new Response("Prompt not found", { status: 404 });
        // }

        // Find the prompt by ID and remove it
        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};
