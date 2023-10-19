"use client"

import useSWR from 'swr';
import { Array2String } from "../../utils/wordListFunctions";
import { fetcher } from '../../utils/serverCall';
// import utilStyles from './../../styles/utils.module.css';

const queryRandomAffix = `
  findRandomAffixes(
    limit: 2
  ){
    affixes{
      _id
      affix_type
      morpheme
      example
      meaning
    }
  }
`;

export default function RandomAffix() {
  /*
  BUG
  I needed to dig one more layer deeper to get to the data fetched.
  const { data, error, isLoading } = useSWR<Data>('{ findRandomAffixes morpheme } }', fetcher)
  */

  const { data, error, isLoading } = useSWR('{ findRandomAffixes (limit: 2) {affixes { _id, affix_type, morpheme, example, meaning } } }', fetcher)

  if (error) {
    // console.log('error :>> ', error);
    return <div>Failed to load</div>
  }
  if (isLoading) {
    // console.log('isLoading :>> ', isLoading);
    return <div>Loading...</div>
  }
  if (!data) {
    // console.log("there's !data");
    return null;
  }
  // console.log('data :>> ', data);

  const { findRandomAffixes } = data;
  // console.log('findRandomAffixes :>> ', findRandomAffixes);
  const { affixes } = findRandomAffixes;
  // console.log('affixes :>> ', affixes);

  const [affix0, affix1] = [...affixes];
  const affix_type0 = affix0.affix_type;
  const affix_type1 = affix1.affix_type;
  const meaning0 = affix0.meaning;
  const example0 = affix0.example;
  const meaning1 = affix1.meaning;
  const example1 = affix1.example;

  let affix_type0String, affix_type1String,example0String, meaning0String, example1String, meaning1String = "";
  
  /*
  * Array2String(arr, str)
  * loop thru array to get 2 affixes
  * set to affix0 and affix1
  * get meaning and example from each affix object
  * set to meaning0, example0, meaning1, example1
  * turn meaning and example from an array of strings
  * into a string with comma separation
  * 
  * first attempt used a for loop and not arr.join()
  */

  const affix0Type = Array2String(affix_type0, affix_type0String);
  const affix1Type = Array2String(affix_type1, affix_type1String);
  const affix0Meaning = Array2String(meaning0, meaning0String);
  const affix0Example = Array2String(example0, example0String);
  const affix1Meaning = Array2String(meaning1, meaning1String);
  const affix1Example = Array2String(example1, example1String);

  return (
    <div>
      <title>2 Random Affixes</title>
      <article>
        <div>Morphemes: {affix0.morpheme} | Types: {affix0Type}
        {/* need to map over examples and meanings */}
          <p>Examples: {affix0Example}</p>
          <p>Meanings: {affix0Meaning}</p>
        </div>
        <br/>
        <hr/>
        <br/>
        <div>Morphemes: {affix1.morpheme} | Types: {affix1Type}
        {/* need to map over examples and meanings */}
          <p>Examples: {affix1Example}</p>
          <p>Meanings: {affix1Meaning}</p>
        </div>
      </article>
    </div>
  )
}

