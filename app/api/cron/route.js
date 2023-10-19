import { connectToDB } from "./../../../utils/database";
import { randomAffixesVerbosWords } from "./../graphql/word-list";

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

    console.log('affixes :>> ', affixes);
    console.log('verbos :>> ', verbos);
    console.log('words :>> ', words);

    // Generate Email Body
    // send one email per list
    const emailContent = await generateEmailBody(affixes, words, verbos)

    // Send Email
    await sendEmail(emailContent, userEmail);

    return lists;
    
  } catch (err) {
    console.log('GET() err :>> ', err);
    throw new Error(`Failed to get all words: ${err.message}`);
  }
}