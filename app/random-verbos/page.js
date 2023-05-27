"use client"

import useSWR from 'swr';
import { fetcher } from '../../utils/serverCall';
// import utilStyles from './../../styles/utils.module.css';

const queryRandomVerbo = `
  findRandomVerbos(limit: 2){
    verbos{
      _id
      spanish
      english
      reflexive
      irregular
      cambiar_de_irregular
      categoria_de_irregular
      terminacion
      grupo
      
    }
  }
`

export default function RandomVerbo() {
  
  const {data, error, isLoading} = useSWR('{findRandomVerbos(limit: 2){ verbos{ _id, spanish, english, reflexive, irregular, cambiar_de_irregular, categoria_de_irregular, terminacion, grupo }}}', fetcher)

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

  const { findRandomVerbos } = data;

  // console.log('findRandomVerbos :>> ', findRandomVerbos);

  const { verbos } = findRandomVerbos;

  const [verbo0, verbo1] = [...verbos];

  /*
  * Add styling for REFLEXIVE, IRREGULAR, cambiar_de_irregular, categoria_de_irregular, grupo, and terminar
  */

  return (
    <div>
      <title>Dos Verbos Al Azar</title>
      <article>
        <div>Espanol: {verbo0.spanish} | English: {verbo0.english}
          <p>grupo: {verbo0.grupo} | terminacion: {verbo0.terminacion}</p>
          <p>{verbo0.reflexive ? "REFLEXIVE | " : null} {verbo0.irregular ? "IRREGULAR | " : null}</p>
          <p>{verbo0.cambiar_de_irregular ? "cambiar_de_irregular: " + verbo0.cambiar_de_irregular + " | " : null} {verbo0.categoria_de_irregular ? "categoria_de_irregular: " + verbo0.categoria_de_irregular : null}</p>
        </div>
        <br/>
        <hr/>
        <br/>
        <div>Espanol: {verbo1.spanish} | English: {verbo1.english}
          <p>grupo: {verbo1.grupo} | terminacion: {verbo1.terminacion}</p>
          <p>{verbo1.reflexive ? "REFLEXIVE | " : null} {verbo1.irregular ? "IRREGULAR | " : null}</p>
          <p>{verbo1.cambiar_de_irregular ? "cambiar_de_irregular: " + verbo1.cambiar_de_irregular + " | " : null} {verbo1.categoria_de_irregular ? "categoria_de_irregular: " + verbo1.categoria_de_irregular : null}</p>
        </div>
      </article>
    </div>
  )
}