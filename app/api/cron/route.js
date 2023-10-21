import { connectToDB } from "./../../../utils/database";
import { generateEmailBody, sendEmail } from "./../../../lib/nodemailer"
import { randomAffixesVerbosWords } from "./../graphql/word-list";
import { NextResponse } from "next/server";

const maxDuration = 10;
const dynamic = "force-dynamic";
const revalidate = 0;

export async function GET() {
  
  try {

    connectToDB();

    const randomAVW = await randomAffixesVerbosWords();
    // console.log('CRON randomAVW :>> ', randomAVW);

    if(!randomAVW) throw new Error("No Words.");

    const lists = randomAVW.data;
    // console.log('lists :>> ', lists);

    const affixes = lists.findRandomAffixes.affixes;
    const verbos = lists.findRandomVerbos.verbos;
    const words = lists.findRandomWords.words;

    // Generate Email Body
    // send one email per list
    const emailContent = await generateEmailBody(affixes, words, verbos)

    // Send Email
    await sendEmail(emailContent, process.env.EMAIL_TO_ADDRESS);
    // console.log('sendEmail called: ', ' >> process.env.EMAIL_TO_ADDRESS >> ', process.env.EMAIL_TO_ADDRESS, ' emailContent: >> ', emailContent);

    return NextResponse.json({
      message: "Ok",
      data: lists,
    });
    
  } catch (err) {
    console.log('GET() err :>> ', err);
    throw new Error(`Failed to get all words: ${err.message}`);
  }
}