import { REST, Routes } from "discord.js";
import { pathToFileURL, fileURLToPath } from "url";
import fs from "fs"
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: './.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(__filename, '..');
const clientID = process.env.CLIENT_ID;
const guildID = process.env.GUILD_ID;

const rest = new REST().setToken(process.env.DISCORD_TOKEN as string);

const commands_folders_path = path.join(__dirname, '../../commands');
const commands_folders = fs.readdirSync(commands_folders_path);
let commands: any[] = [];

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
      commands.push(command.data.toJSON());
      console.log(`> Imported ${file_path}`);
    } else {
      console.warn(`Command at ${file_path} is missing properties`);
    }
  }
}

try {
  console.log(`Refreshing ${commands.length} commands...`);
  // commands = []   // uncomment to delete all commands
  // const data: any = await rest.put(Routes.applicationGuildCommands(clientID as string, guildID as string), { body: commands });
  const data: any = await rest.put(Routes.applicationCommands(clientID as string), { body: commands });
  console.warn(`Successfully reloaded ${data.length} application commands.`);
} catch (error) {
  console.trace(error);
};