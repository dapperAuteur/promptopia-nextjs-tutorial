"use server"

import { Array2String } from "./../../utils/wordListFunctions";
import nodemailer from 'nodemailer';

export async function generateEmailBody(affixes, words, verbos) {

  // Affixes Email
  const [affix0, affix1, affix2] = [...affixes];

  const affix_type0 = affix0.affix_type;
  const affix_type1 = affix1.affix_type;
  const affix_type2 = affix2.affix_type;

  const meaning0 = affix0.meaning;
  const example0 = affix0.example;

  const meaning1 = affix1.meaning;
  const example1 = affix1.example;

  const meaning2 = affix2.meaning;
  const example2 = affix2.example;

  let affix_type0String,
      example0String,
      meaning0String,
      affix_type1String,
      example1String,
      meaning1String,
      affix_type2String,
      example2String,
      meaning2String = "";

  const affix0Type = Array2String(affix_type0, affix_type0String);
  const affix0Meaning = Array2String(meaning0, meaning0String);
  const affix0Example = Array2String(example0, example0String);

  const affix1Type = Array2String(affix_type1, affix_type1String);
  const affix1Meaning = Array2String(meaning1, meaning1String);
  const affix1Example = Array2String(example1, example1String);

  const affix2Type = Array2String(affix_type2, affix_type2String);
  const affix2Meaning = Array2String(meaning2, meaning2String);
  const affix2Example = Array2String(example2, example2String);
  
  let subjectAffixes = "Daily Affix List";
  let bodyAffixes = `
    <div>
      <title>3 Random Affixes</title>
      <article>
        <div>Morphemes: ${affix0.morpheme} | Types: ${affix0Type}
        {/* need to map over examples and meanings */}
          <p>Examples: ${affix0Example}</p>
          <p>Meanings: ${affix0Meaning}</p>
        </div>
        <br/>
        <hr/>
        <br/>
        <div>Morphemes: ${affix1.morpheme} | Types: ${affix1Type}
        {/* need to map over examples and meanings */}
          <p>Examples: ${affix1Example}</p>
          <p>Meanings: ${affix1Meaning}</p>
        </div>
        <br/>
        <hr/>
        <br/>
        <div>Morphemes: ${affix2.morpheme} | Types: ${affix2Type}
        {/* need to map over examples and meanings */}
          <p>Examples: ${affix2Example}</p>
          <p>Meanings: ${affix2Meaning}</p>
        </div>
      </article>
    </div>
  `;

  // Verbos Email

  const [verbo0, verbo1, verbo2] = [...verbos];

  let subjectVerbos = "Daily Verbo List";
  let bodyVerbos = `
    <div>
      <title>Tres Verbos Al Azar</title>
      <article>
        <div>Espanol: ${verbo0.spanish} | English: ${verbo0.english}
          <p>grupo: ${verbo0.grupo} | terminacion: ${verbo0.terminacion}</p>
          <p>${verbo0.reflexive ? "REFLEXIVE | " : null} ${verbo0.irregular ? "IRREGULAR | " : null}</p>
          <p>${verbo0.cambiar_de_irregular ? "cambiar_de_irregular: " + verbo0.cambiar_de_irregular + " | " : null} ${verbo0.categoria_de_irregular ? "categoria_de_irregular: " + verbo0.categoria_de_irregular : null}</p>
        </div>
        <br/>
        <hr/>
        <br/>
        <div>Espanol: ${verbo1.spanish} | English: ${verbo1.english}
          <p>grupo: ${verbo1.grupo} | terminacion: ${verbo1.terminacion}</p>
          <p>${verbo1.reflexive ? "REFLEXIVE | " : null} ${verbo1.irregular ? "IRREGULAR | " : null}</p>
          <p>${verbo1.cambiar_de_irregular ? "cambiar_de_irregular: " + verbo1.cambiar_de_irregular + " | " : null} ${verbo1.categoria_de_irregular ? "categoria_de_irregular: " + verbo1.categoria_de_irregular : null}</p>
        </div>
        <br/>
        <hr/>
        <br/>
        <div>Espanol: ${verbo2.spanish} | English: ${verbo2.english}
          <p>grupo: ${verbo2.grupo} | terminacion: ${verbo2.terminacion}</p>
          <p>${verbo2.reflexive ? "REFLEXIVE | " : null} ${verbo2.irregular ? "IRREGULAR | " : null}</p>
          <p>${verbo2.cambiar_de_irregular ? "cambiar_de_irregular: " + verbo2.cambiar_de_irregular + " | " : null} ${verbo2.categoria_de_irregular ? "categoria_de_irregular: " + verbo2.categoria_de_irregular : null}</p>
        </div>
      </article>
    </div>
  `;

  // Words Email

  const [word0, word1, word2] = [...words];

  let subjectWords = "Daily Word List";
  let bodyWords = `
    <div>
      <title>3 Random 4 Letter Word</title>
      <article>
        <div>Word: ${word0.word}
          <p>${word0.definition ? "Definition: " + word0.definition + " | " : null} ${word0.meaning ? "Meaning: " + word0.meaning : null}</p>
          <p>Scrabble Points: ${word0.s_points} | Words With Friends Points: ${word0.f_points}</p>
        </div>
        <br/>
        <hr/>
        <br/>
        <div>Word: ${word1.word}
        ${word1.definition ? "Definition: " + word1.definition + " | " : null} ${word1.meaning ? "Meaning: " + word1.meaning : null}
          <p>Scrabble Points: ${word1.s_points} | Words With Friends Points: ${word1.f_points}</p>
        </div>
        <br/>
        <hr/>
        <br/>
        <div>Word: ${word2.word}
        ${word2.definition ? "Definition: " + word2.definition + " | " : null} ${word2.meaning ? "Meaning: " + word2.meaning : null}
          <p>Scrabble Points: ${word2.s_points} | Words With Friends Points: ${word2.f_points}</p>
        </div>
      </article>
    </div>
  `;

  let body = `
    <div>
      <title>3 Random Affixes</title>
      <article>
        <div>Morphemes: ${affix0.morpheme} | Types: ${affix0Type}
          <p>Examples: ${affix0Example}</p>
          <p>Meanings: ${affix0Meaning}</p>
        </div>
        <br/>
        <hr/>
        <br/>
        <div>Morphemes: ${affix1.morpheme} | Types: ${affix1Type}
          <p>Examples: ${affix1Example}</p>
          <p>Meanings: ${affix1Meaning}</p>
        </div>
        <br/>
        <hr/>
        <br/>
        <div>Morphemes: ${affix2.morpheme} | Types: ${affix2Type}
          <p>Examples: ${affix2Example}</p>
          <p>Meanings: ${affix2Meaning}</p>
        </div>
      </article>
    </div>
    <br/>
    <hr/>
    <br/>
    <div>
      <title>Tres Verbos Al Azar</title>
      <article>
        <div>Espanol: ${verbo0.spanish} | English: ${verbo0.english}
          <p>grupo: ${verbo0.grupo} | terminacion: ${verbo0.terminacion}</p>
          <p>${verbo0.reflexive ? "REFLEXIVE | " : null} ${verbo0.irregular ? "IRREGULAR | " : null}</p>
          <p>${verbo0.cambiar_de_irregular ? "cambiar_de_irregular: " + verbo0.cambiar_de_irregular + " | " : null} ${verbo0.categoria_de_irregular ? "categoria_de_irregular: " + verbo0.categoria_de_irregular : null}</p>
        </div>
        <br/>
        <hr/>
        <br/>
        <div>Espanol: ${verbo1.spanish} | English: ${verbo1.english}
          <p>grupo: ${verbo1.grupo} | terminacion: ${verbo1.terminacion}</p>
          <p>${verbo1.reflexive ? "REFLEXIVE | " : null} ${verbo1.irregular ? "IRREGULAR | " : null}</p>
          <p>${verbo1.cambiar_de_irregular ? "cambiar_de_irregular: " + verbo1.cambiar_de_irregular + " | " : null} ${verbo1.categoria_de_irregular ? "categoria_de_irregular: " + verbo1.categoria_de_irregular : null}</p>
        </div>
        <br/>
        <hr/>
        <br/>
        <div>Espanol: ${verbo2.spanish} | English: ${verbo2.english}
          <p>grupo: ${verbo2.grupo} | terminacion: ${verbo2.terminacion}</p>
          <p>${verbo2.reflexive ? "REFLEXIVE | " : null} ${verbo2.irregular ? "IRREGULAR | " : null}</p>
          <p>${verbo2.cambiar_de_irregular ? "cambiar_de_irregular: " + verbo2.cambiar_de_irregular + " | " : null} ${verbo2.categoria_de_irregular ? "categoria_de_irregular: " + verbo2.categoria_de_irregular : null}</p>
        </div>
      </article>
    </div>
    <br/>
    <hr/>
    <br/>
    <div>
      <title>3 Random 4 Letter Word</title>
      <article>
        <div>Word: ${word0.word}
          <p>${word0.definition ? "Definition: " + word0.definition + " | " : null} ${word0.meaning ? "Meaning: " + word0.meaning : null}</p>
          <p>Scrabble Points: ${word0.s_points} | Words With Friends Points: ${word0.f_points}</p>
        </div>
        <br/>
        <hr/>
        <br/>
        <div>Word: ${word1.word}
        ${word1.definition ? "Definition: " + word1.definition + " | " : null} ${word1.meaning ? "Meaning: " + word1.meaning : null}
          <p>Scrabble Points: ${word1.s_points} | Words With Friends Points: ${word1.f_points}</p>
        </div>
        <br/>
        <hr/>
        <br/>
        <div>Word: ${word2.word}
        ${word2.definition ? "Definition: " + word2.definition + " | " : null} ${word2.meaning ? "Meaning: " + word2.meaning : null}
          <p>Scrabble Points: ${word2.s_points} | Words With Friends Points: ${word2.f_points}</p>
        </div>
      </article>
    </div>
  `;

  function getCurrentDate() {
    let date = new Date();
    
    let hour = date.getHours();
    hour = hour < 10 ? '0' + hour : hour;
    
    let minute = date.getMinutes();
    minute = minute < 10 ? '0' + minute : minute;
    
    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    
    let day = date.getDate();
    day = day < 10 ? '0' + day : day;
    
    let year = date.getFullYear();
    
    return `${hour}:${minute} ${month}/${day}/${year}`
  }
  
  const currentDate = getCurrentDate();

  // console.log('currentDate :>> ', currentDate);

  // console.log('`Word Lists ${currentDate}` :>> ', `Word Lists ${currentDate}`);

  return {
    subject: `Word Lists ${currentDate}`,
    body,
    // subjectVerbos,
    // bodyVerbos,
    // subjectWords,
    // bodyWords
  }
}

const transporter = nodemailer.createTransport({
  pool: true,
  service: 'hotmail',
  port: 2525,
  auth: {
    user: process.env.EMAIL_FROM_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
  maxConnections: 1
});

export const sendEmail = async (emailContent, sendTo) => {

  const mailOptions = {
    from: process.env.EMAIL_FROM_ADDRESS,
    to: sendTo,
    html: emailContent.body,
    subject: emailContent.subject
  }

  transporter.sendMail(mailOptions, (error, info) => {

    // console.log('transporter.sendMail() mailOptions :>> ', mailOptions);

    if(error) return console.log("transporter.sendMail(mailOptions, (error: any, info: any) error", error);
    
    // console.log('Email sent: ', info);
  })
}