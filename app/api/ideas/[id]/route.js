import Idea from "@models/idea";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (request, {params}) => {
  try {
    await connectToDB();

    // console.log('params.id :>> ', params.id);
    const idea = await Idea.findById(params.id).populate("creator");
    

    // console.log('idea :>> ', idea);

    if (!idea) {
      return new Response("Idea NOT Found.", { status: 404 });  
    }
    return new Response(JSON.stringify(idea), { status: 200 })
  } catch (err) {
    console.log('GET Idea err :>> ', err);
    return new Response("Internal Server Error.", { status: 500 });
  }
}

export const PATCH = async (request, { params }) => {
  const { idea, tag, userId } = await request.json();

  try {
    await connectToDB();

    // Find the existing idea by ID
    const existingIdea = await Idea.findById(params.id);

    if (!existingIdea) {
      return new Response('0 Idea NOT found.', {
        status: 404
      });
    }

    // console.log('userId :>> ', userId);

    const existingUser = await User.findById(userId);

    // console.log('existingUser :>> ', existingUser);

    if (!existingUser) {
        return new Response("Idea not found", { status: 404 });
    }

    const existingUserIsIdeaOwner = JSON.stringify(existingUser._id) === JSON.stringify(existingIdea.creator);

    if (!existingUserIsIdeaOwner) {
        return new Response("Idea not found", { status: 404 });
    }

    // console.log('0 existingIdea :>> ', existingIdea);
    // Update the idea with new data
    const updatedIdea = Object.assign(existingIdea, {
      ...idea
    });


    // console.log('1 updatedIdea :>> ', updatedIdea);

    await updatedIdea.save();
    return new Response(JSON.stringify(updatedIdea), { status: 200 });

  } catch (err) {
    console.log('Updating Idea err :>> ', err);
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