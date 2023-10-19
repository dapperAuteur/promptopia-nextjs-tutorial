
function replaceTagIds(tags, ideas) {
  // Map to store tag objects by ID
  const tagMap = new Map();

  // Create Map of tags by ID
  tags.forEach(tag => {
    // console.log('tag :>> ', tag);
    return (
      tagMap.set(tag._id, tag)
    );
  });
  // console.log('tagMap :>> ', tagMap);

  // Map ideas array, replacing tag IDs with tag objects
  const result = ideas.map(idea => {
    // Map ideas.tags array
    // console.log('idea :>> ', idea);
    const tags = idea.tags.map(tagId => {
      // console.log('tagId :>> ', tagId);
      console.log('tagMap :>> ', tagMap);
      return tagMap.get(tagId);
    })
    // console.log('tags :>> ', tags);

    return {
      ...idea,
      tags
    };
  });
  return result;
}
ideas = replaceTagIds(tags, ideas);