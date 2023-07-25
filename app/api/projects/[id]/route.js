import Project from "@models/project";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {

  try {
    await connectToDB();

    // console.log('params.id :>> ', params.id);
    const project = await Project.findById(params.id).populate("creator");
    // console.log('project :>> ', project);

    if (!project) {
      return new Response("Project NOT Found", { status: 200 })
    }
    return new Response(JSON.stringify(project), { status: 201 })
  } catch (err) {
    // console.log('GET Project err :>> ', err);
    return new Response("Internal Server Error.", { status: 500 });
  }
}

export const PATCH = async (request, {params}) => {
  const {project, userId} = await request.json();

  try {
    await connectToDB()
    /* get logged in user id
    compare it with id of project creator
    console.log('params.id :>> ', params.id);

    const user = await User.findById(project.creator);

    if (!user) {
      return new Response("Project Requires a CreatorID", { status: 200 });
    }
    console.log('user :>> ', user);

    if (user.) {
      
    }

    */
    const existingProject = await Project.findById(params.id);

    if (!existingProject) {
      new Response('Project NOT Found', { status: 404 });
    }

    const existingUser = await User.findById(userId);

    if (!existingUser) {
        return new Response("Project not found", { status: 404 });
    }

    const existingUserIsProjectOwner = JSON.stringify(existingUser._id) === JSON.stringify(existingProject.creator);

    if (!existingUserIsProjectOwner) {
        return new Response("Project not found", { status: 404 });
    }

    // console.log('existingProject :>> ', existingProject);
    const updatedProject = Object.assign(existingProject, {
      ...project
    })

    // console.log('updatedProject :>> ', updatedProject);
    await updatedProject.save();

    return new Response(JSON.stringify(updatedProject), { status: 201 });

  } catch (err) {
    console.log('PATCH Project err :>> ', err);

    return new Response("ERROR PATCH Project", { status: 500 });
  }
}

export const DELETE = async (request, { params }) => {
  // check if logged in user has permission to delete the project
  // are they an admin or creator of the project

  try {
    await connectToDB();
    await Project.findByIdAndRemove(params.id);
    return new Response("Project deleted successfully", { status: 200 })

  } catch (err) {
    console.log('ERROR DELETE Project err :>> ', err);
    return new Response("Error deleting project", { status: 500 });
  }

}