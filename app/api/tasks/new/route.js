import Task from "@models/task";
import { connectToDB } from "@utils/database";

export const POST = async(request) => {
  // const {userId, task, tag} = await request.json();
  const task = await request.json();

  // console.log('task :>> ', task);
  // console.log('requestJSON :>> ', requestJSON);
  try {
    // Connect to database
    await connectToDB();
  
    const newTask = new Task({
      creator: task.creator,
      title: task.title,
      description: task.description || '',
      budget: task.budget,
      taskStatus: task.taskStatus || '',
      tags: task.tags || [],
      ideas: task.ideas,
      points: task.points,
      assignedDate: task.assignedDate,
      dueDate: task.dueDate
    });

    await newTask.save();
    return new Response(JSON.stringify(newTask), {status: 201})
  } catch (err) {
    console.log('new Task err :>>', err);
    return new Response(JSON.stringify({error: err}), {status: 500});
  }
}