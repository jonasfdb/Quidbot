import { generateQuestionID } from "../../qman/qmanGenerators";
import { Guild } from "./models/Guild";
import { Question } from "./models/Question";
import { ulid } from "ulid";

export async function findGuild(server_id: string): Promise<Guild> {
  let server = await Guild.findOne({ where: { dGuildID: server_id } });

  if (!server) {
    try {
      server = await Guild.create({
        ULID: ulid(),
        dGuildID: server_id,
        allowUnverifiedQuestions: false,
        allowedFlagsBitmask: 0,
        questionSentAtTimezone: "Europe/Berlin",
        questionSentAtLocalHour: 0,
      });
      console.warn(`New server ${server.dGuildID} added to database`);
    } catch (error) {
      console.trace(error);
      throw error;
    }
  }

  return server;
}

export async function findQuestion(questionID: string): Promise<Question> {
  let question = await Question.findOne({
    where: { ULID: questionID },
  });

  if (!question) {
    try {
      question = await Question.create({
        ULID: ulid(),
        token: generateQuestionID(),
        questionText: "default",
        tagsBitfield: 0,
        flagsBitfield: 0,
        manuallyVerified: false
      });
      console.warn(`New question ${question.ULID} added to database`);
    } catch (error) {
      console.trace(error);
      throw error;
    }
  }

  return question;
}

export async function insertQuestion(questionText: string): Promise<Question> {
  let question: Question;
  try {
    question = await Question.create({
      ULID: ulid(),
      token: generateQuestionID(),
      questionText: questionText,
      tagsBitfield: 0,
      flagsBitfield: 0,
      manuallyVerified: false
    });
    console.warn(`New question ${question.questionText} with IDs ${question.ULID, question.token} added to database`);
  } catch (error) {
    console.trace(error);
    throw error;
  }

  return question;
}