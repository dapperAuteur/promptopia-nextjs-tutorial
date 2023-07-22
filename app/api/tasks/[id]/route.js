import Task from "@models/task";
import { connectToDB } from "@utils/database";

export const GET = async (request, {params}) => {
  try {
    await connectToDB();

    console.log('params.id :>> ', params.id);
    const task = await Task.findById(params.id).populate("creator");
    

    // console.log('task :>> ', task);

    if (!task) {
      return new Response("Task NOT Found.", { status: 404 });  
    }
    return new Response(JSON.stringify(task), { status: 200 })
  } catch (err) {
    return new Response("Internal Server Error.", { status: 500 });
  }
}

export const PATCH = async (request, { params }) => {
  const { task, tag } = await request.json();

  try {
    await connectToDB();

    // Find the existing task by ID
    const existingTask = await Task.findById(params.id);

    if (!existingTask) {
      return new Response('Task NOT found.', {
        status: 404
      });
    }

    // Update the task with new data
    const updatedTask = Object.assign(existingTask, {
      ...task
    });


    console.log('1 updatedTask :>> ', updatedTask);

    await updatedTask.save();
    return new Response(JSON.stringify(updatedTask), { status: 200 });

  } catch (err) {
    return new Response("Error Updating Task", {
      status: 500
    });
  }
}

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the task by ID and remove it
    await Task.findByIdAndRemove(params.id);

    return new Response('Task deleted successfully', { status: 200 });
  } catch (err) {
    return new Response("Error deleting task", {
      status: 500
    })
  }
}