"use server"

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
        <br/>
        <hr/>
        <br/>
        <div>Morphemes: {affix2.morpheme} | Types: {affix2Type}
        {/* need to map over examples and meanings */}
          <p>Examples: {affix2Example}</p>
          <p>Meanings: {affix2Meaning}</p>
        </div>
      </article>
    </div>
  `;

  let subjectWords = "Daily Word List";
  let bodyWords = `
  `;

  let subjectVerbos = "Daily Verbo List";
  let bodyVerbos = `
  `;

}