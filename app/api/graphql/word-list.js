export async function getRandomAffixes() {
  const res = await fetch('https://code-word-list.witus.online/api/graphql?query=%23%0A%23+Welcome+to+Yoga+GraphiQL%0A%23%0A%23+Yoga+GraphiQL+is+an+in-browser+tool+for+writing%2C+validating%2C+and%0A%23+testing+GraphQL+queries.%0A%23%0A%23+Type+queries+into+this+side+of+the+screen%2C+and+you+will+see+intelligent%0A%23+typeaheads+aware+of+the+current+GraphQL+type+schema+and+live+syntax+and%0A%23+validation+errors+highlighted+within+the+text.%0A%23%0A%23+GraphQL+queries+typically+start+with+a+%22%7B%22+character.+Lines+that+start%0A%23+with+a+%23+are+ignored.%0A%23%0A%23+An+example+GraphQL+query+might+look+like%3A%0A%23%0A%23+++++%7B%0A%23+++++++field%28arg%3A+%22value%22%29+%7B%0A%23+++++++++subField%0A%23+++++++%7D%0A%23+++++%7D%0A%23%0A%23+Keyboard+shortcuts%3A%0A%23%0A%23++Prettify+Query%3A++Shift-Ctrl-P+%28or+press+the+prettify+button+above%29%0A%23%0A%23+++++Merge+Query%3A++Shift-Ctrl-M+%28or+press+the+merge+button+above%29%0A%23%0A%23+++++++Run+Query%3A++Ctrl-Enter+%28or+press+the+play+button+above%29%0A%23%0A%23+++Auto+Complete%3A++Ctrl-Space+%28or+just+start+typing%29%0A%23%0A%7B%0A++findRandomAffixes%7B%0A++++count%0A++%7D%0A%7D');
  // let d = res.clone();
  // console.log('d :>> ', d);
  const data = await res.json();
  // console.log('data :>> ', data);
  return data;

}

export async function randomAffixesVerbosWords() {
  const res = await fetch('https://code-word-list.witus.online/api/graphql?query=%7B%0A++findRandomAffixes%28limit%3A+3%29+%7B%0A++++count%0A++++affixes%7B%0A++++++morpheme%0A++++++meaning%0A++++++example%0A++++++affix_type%0A++++%7D%0A++%7D%0A++findRandomVerbos%28limit%3A+3%29+%7B%0A++++count%0A++++verbos%7B%0A++++++spanish%0A++++++english%0A++++++reflexive%0A++++++irregular%0A++++++categoria_de_irregular%0A++++++cambiar_de_irregular%0A++++++terminacion%0A++++++grupo%0A++++%7D%0A++%7D%0A++findRandomWords%28limit%3A+3%29+%7B%0A++++count%0A++++words%7B%0A++++++word%0A++++++meaning%0A++++++definition%0A++++%7D%0A++%7D%0A%7D');

  const data = await res.json();
  console.log('data :>> ', data);
  return data;
}