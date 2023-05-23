import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async(request) => {
  const {userId, prompt, tag} = await request.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), {status: 201})
  } catch (err) {
    console.log('new Prompt err :>> ', err);
    return new Response(JSON.stringify({error: err}), {status: 500});
  }
}