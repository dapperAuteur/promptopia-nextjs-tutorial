import Tag from "@models/tag";
import { connectToDB } from "@utils/database";

export const GET = async(request, { params }) => {

  // console.log('params :>> ', params);

  try {
    await connectToDB();

    const tag = await Tag.findById(params.id)
    // console.log('tag :>> ', tag);
    return new Response(JSON.stringify(tag), { status: 201 });

  } catch (err) {
    console.log('ERROR GET err :>> ', err);
    return new Response("ERROR GET Tag", { status: 500});
  }
}

export const PATCH = async(request, { params }) => {
  // console.log('params :>> ', params);
  const tagUpdate = await request.json();

  // console.log('tagUpdate :>> ', tagUpdate);

  try {
    await connectToDB();

    const foundTag = await Tag.findById(params.id)

    if (!foundTag) {
      console.log("PATCH TAG NOT Found");
      return new Response("PATCH TAG NOT Found", { status: 200 });
    }

    // console.log('foundTag :>> ', foundTag);
    const updatedTag = Object.assign(foundTag, {
      ...tagUpdate
    });
    // console.log('updatedTag :>> ', updatedTag);
    updatedTag.save()
    return new Response(JSON.stringify(updatedTag), { status: 201 });

  } catch (err) {
    console.log('PATCH err :>> ', err);
    return new Response("ERROR PATCH", { status: 500 });
  }
}

export const DELETE = async(request, { params }) => {
  console.log('params :>> ', params);

  try {
    await connectToDB();

    await Tag.findByIdAndRemove(params.id);
    return new Response("Tag DELETED Successfuly", { status: 200 });
  } catch (err) {
    console.log('DELETE err :>> ', err);
    return new Response("ERROR DELETE", { status: 500 });
  }
}