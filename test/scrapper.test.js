require('dotenv').config();
const axios = require('axios');

const APIKey = process.env.RAPID_API_KEY
const APIHost = process.env.RAPID_API_HOST

const options = {
  method: 'POST',
  url: 'https://auto-download-all-in-one.p.rapidapi.com/v1/social/autolink',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': APIKey,
    'X-RapidAPI-Host': APIHost
  },
  data: {
    url: 'https://soundcloud.com/user-901031171/sets/never-let-go-of-your-dreams?si=c00207524a364a4caae6b278acf31b2a'
  }
};

const runScrapper = async () => {
    try {
        const response = await axios.request(options);
        console.log(Object.values(response.data.medias));
    } catch (error) {
        console.error(error);
    }
}

runScrapper()
