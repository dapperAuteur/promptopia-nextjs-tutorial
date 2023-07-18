import Idea from "@models/idea";
import { connectToDB } from "@utils/database";

export const POST = async(request) => {
  const {userId, idea, tag} = await request.json();
  try {
    // Connect to database
    await connectToDB();
  
    const newIdea = new Idea({
      creator: userId,
      title: idea.title,
      description: idea.description,
      budget: idea.budget,
      ideaStatus: idea.ideaStatus,
      points: idea.points,
      tag: idea.tag
    });

    await newIdea.save();
    return new Response(JSON.stringify(newIdea), {status: 201})
  } catch (err) {
    console.log('new Idea err :>>', err);
    return new Response(JSON.stringify({error: err}), {status: 500});
  }
}