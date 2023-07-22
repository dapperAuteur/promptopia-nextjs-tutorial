import Project from "@models/project";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    const projects = await Project.find({}).populate('creator');

    // console.log('projects :>> ', projects);

    return new Response(JSON.stringify(projects), { status: 200});
  } catch (err) {
    console.log('GET ALL Projects err :>> ', err);
    return new Response("Failed to fetch ALL PROJECTS", { status: 500 })
  }
}