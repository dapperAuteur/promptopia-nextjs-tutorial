import Tag from "@models/tag";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const createTag = await request.json();
  
  try {
    await connectToDB();

    console.log('createTag :>> ', createTag);

    const newTag = new Tag({
      title: createTag.title
    });

    const createdTag = await newTag.save();
    console.log('createdTag :>> ', createdTag);

    return new Response(JSON.stringify(createdTag), { status: 201 });

  } catch (err) {
    console.log('POST err :>> ', err);
    return new Response("ERROR POST", { status: 500 })
  }
}