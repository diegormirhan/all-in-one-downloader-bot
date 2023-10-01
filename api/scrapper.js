require('dotenv').config();
const axios = require('axios');

const APIKey = process.env.RAPID_API_KEY
const APIHost = process.env.RAPID_API_HOST

/**
 * Scrapes the provided link and returns an array of media objects.
 *
 * @param {string} link - The link to be scraped.
 * @return {Array} An array of media objects.
 */
const scrapper = async (link) => {
    const options = {
        method: 'POST',
        url: 'https://auto-download-all-in-one.p.rapidapi.com/v1/social/autolink',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': APIKey,
            'X-RapidAPI-Host': APIHost
        },
        data: {
            url: link
        }
    }

    try {
        const response = await axios.request(options);
        return Object.values(response.data.medias)
    } catch (error) {
        return error;
    }
}

module.exports = scrapper