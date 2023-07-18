import Idea from "@models/idea";
import { connectToDB } from "@utils/database";

export const GET = async (request, {params}) => {
  try {
    await connectToDB();

    console.log('params.id :>> ', params.id);
    const idea = await Idea.findById(params.id).populate("creator");
    

    console.log('idea :>> ', idea);

    if (!idea) {
      return new Response("Idea NOT Found.", { status: 404 });  
    }
    return new Response(JSON.stringify(idea), { status: 200 })
  } catch (err) {
    return new Response("Internal Server Error.", { status: 500 });
  }
}

export const PATCH = async (request, { params }) => {
  const { idea, tag } = await request.json();

  try {
    await connectToDB();

    // Find the existing idea by ID
    const existingIdea = await Idea.findById(params.id);

    if (!existingIdea) {
      return new Response('Idea NOT found.', {
        status: 404
      });
    }

    console.log('0 existingIdea :>> ', existingIdea);
    // Update the idea with new data
    const updatedIdea = Object.assign(existingIdea, {
      ...idea
    });


    console.log('1 updatedIdea :>> ', updatedIdea);

    await updatedIdea.save();
    return new Response(JSON.stringify(updatedIdea), { status: 200 });

  } catch (err) {
    return new Response("Error Updating Idea", {
      status: 500
    });
  }
}

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the idea by ID and remove it
    await Idea.findByIdAndRemove(params.id);

    return new Response('Idea deleted successfully', { status: 200 });
  } catch (err) {
    return new Response("Error deleting idea", {
      status: 500
    })
  }
}