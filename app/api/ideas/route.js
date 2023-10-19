import Idea from "@models/idea";
import Tag from "@models/tag";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();
    // const ideas = await Idea.find({}).populate('creator').exec();
    // const ideas = await Idea.find({}).populate('creator');
    let ideas = await Idea.find({}).populate(
      [
        {
          path: "creator",  
          strictPopulate: false 
        },{
          path: "tag",  
          strictPopulate: false 
        }
      ]
    );

    // console.log('ideas :>> ', ideas);

    let tags = await Tag.find({});
    // console.log('tags :>> ', tags);

    function getTagFromTagIds(arr0, arr1) {
      // for each idea in ideas
      if (arr1.tags?.length > 0) {
        for (let i = 0; i < arr1.length; i++) {
          for (let j = 0; j < arr1[i].tags.length; j++) {
            for (let n = 0; n < arr0.length; n++) {
              if (arr1[i].arr0[j] === arr0[n]._id) {
                arr1[i].arr0[j] = arr0[n];
              }
            }
          }
          // console.log('arr1[i] :>> ', arr1[i]);
        }
        // console.log('arr1 :>> ', arr1);
      }
      
      // loop thru the array of idea.tags
      // find tag with id that matches one of those ids and push it into a new array called ideaTags
      // assign ideaTags to idea.tags

      
    }
    getTagFromTagIds(tags, ideas);

    return new Response(JSON.stringify(ideas), { status: 200 });
  } catch (err) {
    console.log('GET ALL Ideas err :>> ', err);
    return new Response("Failed to fetch ALL IDEAS", { status: 500 })
  }
}