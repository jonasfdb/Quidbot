import { initDatabase } from "../util/database/dbinit";
import { insertQuestion } from "../util/database/dbutils";

await initDatabase();

const questions: string[] = [
  // add questions to go into the db here
];

questions.forEach(async (question) => {
  // console.log(`Inserting question: ${question}`);
  await insertQuestion(question);
});