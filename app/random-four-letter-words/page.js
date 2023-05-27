"use client"

import useSWR from 'swr';
import { fetcher } from '../../utils/serverCall';
// import utilStyles from './../../styles/utils.module.css';

const queryRandomWord = `
  findRandomWords(limit: 2){
    count
    words{
      _id
      word
      meaning
      definition
      f_points
      s_points
    }
  }
`

export default function RandomWord() {
  const {data, error, isLoading} = useSWR('{findRandomWords(limit: 2){ words{ _id, word, meaning, definition, f_points, s_points } }}', fetcher)

  if (error) {
    return <div>Failed to load</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!data) {
    return null
  }
  // console.log('data :>> ', data);

  const { findRandomWords } = data;

  // console.log('findRandomWords :>> ', findRandomWords);

  const {words} = findRandomWords;

  const [word0, word1] = [...words];

  return (
    <div>
      <title>Random 4 Letter Word</title>
      <article>
        <div>Word: {word0.word}
          <p>{word0.definition ? "Definition: " + word0.definition + " | " : null} {word0.meaning ? "Meaning: " + word0.meaning : null}</p>
          <p>Scrabble Points: {word0.s_points} | Words With Friends Points: {word0.f_points}</p>
        </div>
        <br/>
        <hr/>
        <br/>
        <div>Word: {word1.word}
        {word1.definition ? "Definition: " + word1.definition + " | " : null} {word1.meaning ? "Meaning: " + word1.meaning : null}
          <p>Scrabble Points: {word1.s_points} | Words With Friends Points: {word1.f_points}</p>
        </div>
      </article>
    </div>
  )
}