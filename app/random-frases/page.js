"use client"

import useSWR from "swr";
import { fetcher } from "./../../utils/serverCall";

const queryRandomFrases = `
{
  findRandomFrases(limit: 3){
    frases{
      _id
      spanish
      english
      lesson
      known
      }
    }
  }
`

export default function RandomFrases() {
  const {data, error, isLoading} = useSWR(queryRandomFrases, fetcher)

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

  const {findRandomFrases} = data;
  console.log('findRandomFrases :>> ', findRandomFrases);

  const {frases} = findRandomFrases;
  const [frase0, frase1, frase2] = [...frases];
  console.log('frase0 :>> ', frase0);
  console.log('frase1 :>> ', frase1);
  console.log('frase2 :>> ', frase2);

  return (
    <div>
      <title>Tres Frases Al Azar</title>
      <artilce>
        <div>Espanol: {frase0.spanish} | Lesson: {frase0.lesson}</div>
        <div>English: {frase0.english} | Known: {frase0.known}</div>
        <br/>
        <div>Espanol: {frase1.spanish} | Lesson: {frase1.lesson}</div>
        <div>English: {frase1.english} | Known: {frase1.known}</div>
        <br/>
        <div>Espanol: {frase2.spanish} | Lesson: {frase2.lesson}</div>
        <div>English: {frase2.english} | Known: {frase2.known}</div>
      </artilce>
    </div>
  )
}