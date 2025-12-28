import { Sequelize } from 'sequelize';
import { initGuildModel } from './models/Guild';
import { initQuestionModel } from './models/Question';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const database = new Sequelize(process.env.DATABASE_URL as string, { logging: false });

export async function initDatabase() {
  console.log(`Connecting to main database...`);

  initGuildModel(database);
  initQuestionModel(database);

  try {
    await database.authenticate();
    await database.sync({ alter: true })
      .then(() => {
        console.log(`> SUCCESS`);
      })
      .catch((error) => console.trace(error));
  } catch (error) {
    console.trace("Failed to connect to main database:", error);
    process.exit(1);
  }
}
