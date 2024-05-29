// import { generateEmailBody, sendEmail } from "./../../../lib/nodemailer"
// import { randomAffixesVerbosWords, randomAffixesFrasesVerbosWords } from "./../graphql/word-list";
// import { NextResponse } from "next/server";

// const maxDuration = 10;
// const dynamic = "force-dynamic";
// const revalidate = 0;

// export async function GET() {
  
//   try {

//     // const randomAVW = await randomAffixesVerbosWords();
//     // console.log('CRON randomAVW :>> ', randomAVW);
//     const randomAFVW = await randomAffixesFrasesVerbosWords();

//     // if(!randomAVW) throw new Error("No Words.");
//     if(!randomAFVW) throw new Error("No Words.");

//     // const lists = randomAVW.data;
//     // console.log('lists :>> ', lists);
//     const lists = randomAFVW.data;
//     console.log('lists :>> ', lists);

//     const affixes = lists.findRandomAffixes.affixes;
//     const frases = lists.findRandomAffixes.frases;
//     const verbos = lists.findRandomVerbos.verbos;
//     // const words = lists.findRandomWords.words;

//     // Generate Email Body
//     // send one email per list
//     // const emailContent = await generateEmailBody(affixes, words, verbos);
//     const emailContent = await generateEmailBody(affixes, frases, /* words, */ verbos);

//     // Send Email
//     await sendEmail(emailContent, process.env.EMAIL_TO_ADDRESS);
//     // console.log('\n *** \n sendEmail called: \n *** \n emailContent.subject', emailContent.subject);

//     return NextResponse.json({
//       message: "Ok",
//       data: lists,
//     });
    
//   } catch (err) {
//     console.log('GET() err :>> ', err);
//     throw new Error(`Failed to get all words: ${err.message}`);
//   }
// }