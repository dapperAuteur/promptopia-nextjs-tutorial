import Task from "./../../../models/task";
import User from "./../../../models/user";
import { connectToDB } from "./../../../utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();
    // const tasks = await Task.find({}).populate('creator').exec();
    const tasks = await Task.find({}).populate('creator');

    // console.log('tasks :>> ', tasks);

    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (err) {
    console.log('GET ALL Tasks err :>> ', err);
    return new Response("Failed to fetch ALL IDEAS", { status: 500 })
  }
}