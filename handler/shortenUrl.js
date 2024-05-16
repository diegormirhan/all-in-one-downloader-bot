const axios = require('axios')

const shortenUrl = async (longUrl) => {
    try {
        const response = await axios.get(`http://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`)
        return response.data;
    } catch (error) {
        console.error('Error shortening URL:', error);
        throw new Error('Failed to shorten URL');
    }
}

module.exports = { shortenUrl }