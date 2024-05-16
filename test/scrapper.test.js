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
    url: 'https://open.spotify.com/intl-pt/track/3PZAaFR5G3VEcrz2AljA41?si=d260e5148de140fa'
  }
};

const runScrapper = async () => {
  try {
    const response = await axios.request(options);
    const obj = Array.from(response.data.medias);
    console.log(Object.values(response.data.medias));
    
  } catch (error) {
    console.error(error);
  }
}

runScrapper()
