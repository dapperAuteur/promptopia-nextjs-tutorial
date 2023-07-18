import Idea from "@models/idea";
import { connectToDB } from "@utils/database";

export const GET = async (request, {params}) => {
  try {
    await connectToDB();

    const idea = await Idea.findById(params.id).populate("creator")
    if (!idea) {
      return new Response("Idea NOT Found.", { status: 404 });  
    }
    console.log('idea :>> ', idea);
    return new Response(JSON.stringify(idea), { status: 200 })
  } catch (err) {
    return new Response("Internal Server Error.", { status: 500 });
  }
}



// export const PATCH