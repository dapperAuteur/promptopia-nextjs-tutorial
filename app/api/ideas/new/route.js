import Idea from "./../../../../models/idea";
import { connectToDB } from "./../../../../utils/database";

export const POST = async(request) => {
  const idea = await request.json();
  try {
    // Connect to database
    await connectToDB();
  
    const newIdea = new Idea({
      creator: idea.creator,
      title: idea.title,
      description: idea.description,
      tags: idea.tags
    });

    await newIdea.save();
    return new Response(JSON.stringify(newIdea), {status: 201})
  } catch (err) {
    console.log('new Idea err :>>', err);
    return new Response(JSON.stringify({error: err}), {status: 500});
  }
}