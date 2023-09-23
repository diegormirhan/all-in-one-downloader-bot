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
    url: 'https://www.facebook.com/reel/1273876849979229'
  }
};

const runScrapper = async () => {
    try {
        const response = await axios.request(options);
        console.log(response.data.medias);
    } catch (error) {
        console.error(error);
    }
}

runScrapper()
