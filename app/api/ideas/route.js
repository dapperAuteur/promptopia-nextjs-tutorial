import Idea from "@models/idea";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();
    // const ideas = await Idea.find({}).populate('creator').exec();
    const ideas = await Idea.find({}).populate('creator');

    // console.log('ideas :>> ', ideas);

    return new Response(JSON.stringify(ideas), { status: 200 });
  } catch (err) {
    console.log('GET ALL Ideas err :>> ', err);
    return new Response("Failed to fetch ALL IDEAS", { status: 500 })
  }
}