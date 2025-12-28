# Say hi to Quidbot!

![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Node Version](https://img.shields.io/badge/node-%3E%3D24-brightgreen)

Quidbot is a friendly Discord bot that posts a Question of the Day in your server. It fully customizable, timezone-aware, and designed for community fun and reflection. It is also actively worked on and will get many more features soon!

You can invite Quidbot [here](https://discord.com/oauth2/authorize?client_id=1448337109411692566&permissions=116736&integration_type=0&scope=bot).

## ✨ Features and Setup

Quidbot is still bare-bones, but can do a lot already. It will post one question per day for you to answer. To do that, Quidbot allows full question process customization! You can select a channel, your server's timezone, the hour of the day the question should be posted, and even whether or not you follow daylight savings!

If you invite the bot, setting it up is easy. Just run the ```/config set``` command and select a time and channel, and you are good to go!

Of course, I have plans for the road ahead. In the future, Quidbot will support user-submitted QOTDs, question tags (e.g. Yes/No, WYD, NSFW, ...) you can (un)subscribe to, answer streaks and threads, and more!


## 🤝 Contribute to Quidbot

### Got an idea?

If you have an idea, a suggestion or a feature request, you can make your voice heard in two ways. Either you get in contact with me directly, or, preferably, you create an Issue or a Discussion on here. Both works fine!

### Contributing code

If you want to submit code directly, please fork the repo, create a new branch, and submit a pull request with a clear commit message. I'd love to be able to ask you to adhere to the coding style, but in all fairness, my codebase is still mostly a mess and I am still actively working on improving it. GitHub is doing its very best to get me to create a ```./CONTRIBUTING.md```, but I think for now, this should suffice.

## ⚙️ Getting Started

### Prerequisites

You should have a Discord bot token available through your [Discord Developer Portal](https://discord.com/developers), and have [Node.js](https://nodejs.org) >24 and [PostgreSQL](https://www.postgresql.org/) >17.5 installed. This version of Quidbot was built and is running on Node.js 24.11.1 and PostgreSQL 17.5, using discord.js 14.24.2.

### Installation and Setup

Clone the repository into a new folder and run `npm install` to install the necessary packages. Then, create a `.env` file based on the structure in `.env.example` at the project root and populate it with the necessary values.

### Self-hosting

If you choose to self-host the bot, there will not be any questions in the database yet. Quidbot stores them all in a database. There's a little script provided in ```./src/qman``` called ```qmanInjector.ts```, which allows you to inject a JSON array of questions into a database if you give it an array of question texts (just the text!). This is very bare-bones and will be improved upon, but should work for now. If this is not the way you want to go, I recommend DBeaver to manually edit the questions in, otherwise your local Quidbot won't have any to ask.

### Run

Quidbot provides the following executable scripts through `package.json`:

```bash
npm start         # run compiled build using tsx
npm run dev       # run bot quickly for development
npm run build     # compile to JavaScript code
npm run deploy    # deploy commands to the bot
```

## ⚖️ License

This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.

See [`LICENSE`](./LICENSE) for the full text of the license. For a summary of the AGPL-3.0, visit [choosealicense.com](https://choosealicense.com/licenses/agpl-3.0/). A list of all third-party packages used in this project and their respective licenses can be found in [`NOTICE.md`](./NOTICE.md).

## 💭 Contact

Quidbot is developed and maintained with love and care by me, jonasfdb <3

I can best be reached through Discord under the username **jonasfdb** if it is urgent. Otherwise, keep contact to Issues, Discussions and pull requests here.