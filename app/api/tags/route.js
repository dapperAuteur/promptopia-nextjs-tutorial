import Tag from "@models/tag";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    const tags = await Tag.find({});
    console.log('tags :>> ', tags);
    return new Response(JSON.stringify(tags), { status: 201 });
  } catch (err) {
    console.log('GET Tags err :>> ', err);
    return new Response("ERROR GET Tags", { status: 500 });
  }
}