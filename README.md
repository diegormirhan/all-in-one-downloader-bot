---

# All In One Bot Downloader

This versatile Telegram bot, built using Fastify (a faster and optimized alternative to Express), Axios, dotenv, node-telegram-bot-api, require-all, Chai, Mocha, and Nodemon, serves as a comprehensive media downloader from various social media platforms. Leveraging the power of these technologies, it offers efficient and reliable media retrieval capabilities.

## Disclaimer

This project is entirely my creation, developed from scratch, showcasing my expertise in building a versatile media downloader Telegram bot using various APIs. It represents my proficiency in technologies such as Fastify, Axios, dotenv, node-telegram-bot-api, require-all, Chai, Mocha, and Nodemon, and underscores my ability to create efficient and comprehensive solutions from the ground up.

## Technologies Used
- **Fastify:** A high-performance, low overhead web framework for Node.js.
- **Axios:** A promise-based HTTP client for making HTTP requests to fetch media content.
- **dotenv:** A zero-dependency module for loading environment variables from a `.env` file.
- **node-telegram-bot-api:** A library for building Telegram bots.
- **require-all:** A tool for easily requiring all files within a directory.
- **Chai and Mocha:** Testing frameworks for ensuring code quality.
- **Nodemon:** A utility that monitors for changes in your source code and automatically restarts your server.
- **Mongo DataBase:** A no-sql database that is used to store user id's

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/diegormirhan/all-in-one-downloader-bot.git
   cd all-in-one-downloader-bot
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root directory and add the following environment variables:
   ```env
   RAPID_API_KEY = your-rapid-api-key
   RAPID_API_HOST = your-rapid-api-host
   TELEGRAM_API = your-telegram-api-token
   DATABASE_URL = your-mongodb-token-url
   ADMIN_ID = your-admin-chat-id
   ADMIN_PASSWORD = your-admin-password
   ```

   You can obtain the `RAPID_API_KEY` and `RAPID_API_HOST` by signing up for the [Auto Download All in One API on RapidAPI](https://rapidapi.com/nguyenmanhict-MuTUtGWD7K/api/auto-download-all-in-one).

4. Start the server in development mode using Nodemon:
   ```bash
   npm run dev
   ```

5. Start using your Telegram bot! Send it media links from various social media platforms, and it will reply with downloadable files.

## Note

Before using the Auto Download All in One API, make sure to sign up for an API key and host on RapidAPI as mentioned in step 3. This will allow your bot to access the media data from All social media.

Additionally, this project is hosted on Railway for easy deployment and accessibility.

Feel free to customize and extend this bot to support more social media platforms and enhance its functionality. Enjoy downloading media hassle-free with the All In One Bot Downloader!

---
