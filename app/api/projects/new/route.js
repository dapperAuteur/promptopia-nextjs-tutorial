import Project from "./../../../../models/project";
import User from "./../../../../models/user";
import { connectToDB } from "./../../../../utils/database";

export const POST = async(request) => {

  const project = await request.json();
  try {
    await connectToDB();

    const newProject = new Project({
      creator: project.creator,
      title: project.title,
      description: project.description,
      projectStatus: project.projectStatus,
      tags: project.tags,
      points: project.points
    });

    await newProject.save();

    // console.log('newProject :>> ', newProject);
    return new Response(JSON.stringify(newProject), { status: 201 });
  } catch (err) {

    console.log('newProject err :>> ', err);
    return Response('ERROR created during process', err, { status: 500 });
  }
}

