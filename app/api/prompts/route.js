import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    // const prompts = await Prompt.find({}).populate('creator').exec();
    const prompts = await Prompt.find({}).populate('creator');

    // console.log('prompts :>> ', prompts);
    return new Response(JSON.stringify(prompts), { status: 200});

  } catch (err) {
    console.log('GET ALL Prompts err :>> ', err);
    return new Response("Failed to fetch ALL PROMPTS", { status: 500});
  }
}