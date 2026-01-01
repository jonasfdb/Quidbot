import Discord from "discord.js";
import fs from "fs";
import path from "path";
import { pathToFileURL, fileURLToPath } from "url";
import dotenv from "dotenv";
import { initDatabase } from "./src/util/database/dbinit";
dotenv.config({ path: './.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(__filename, '..');

const gatewayIntentList = new Discord.IntentsBitField();
gatewayIntentList.add(
  Discord.GatewayIntentBits.Guilds
);

console.log(`Starting...`)

const commands = []
const commands_folders_path = path.join(__dirname, 'src', 'commands');
const commands_folders = fs.readdirSync(commands_folders_path);

const client = new Discord.Client({
  intents: gatewayIntentList
})
client.commands = new Discord.Collection();

console.log(`Retrieving commands...`);

for (const folder of commands_folders) {
  const commands_path = path.join(commands_folders_path, folder);
  const commands_files = fs.readdirSync(commands_path).filter(file => file.endsWith('.ts') || file.endsWith('.mjs'));

  for (const file of commands_files) {
    const file_path = path.join(commands_path, file);

    if (file_path.includes('_command_base.ts')) {
      break;
    }

    const command = await import(pathToFileURL(file_path).href).then(module => module.default)

    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
      commands.push(command.data.toJSON());
      console.log(`> Imported ${file_path}`);
    } else {
      console.warn(`Command at ${file_path} is missing properties`);
    }
  }
}

console.log(`Retrieving events...`)
const events_path = path.join(__dirname, 'src', 'events');
const events_files = fs.readdirSync(events_path).filter(file => file.endsWith('.ts') || file.endsWith('.mjs'));

for (const file of events_files) {
  const file_path = path.join(events_path, file);

  const event = await import(pathToFileURL(file_path).href).then(module => module.default)

  if (file_path.includes('_event_base.ts')) {
    break;
  }

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }

  console.log(`> Imported ${file_path}`);
};

await initDatabase();

client.login(process.env.DISCORD_TOKEN);