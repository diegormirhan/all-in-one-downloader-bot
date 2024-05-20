const axios = require('axios')

const shortenUrl = async (longUrl) => {
    try {
        const response = await axios.get(`http://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`)
        return response.data;
    } catch (error) {
        console.log('Error shortening URL:', error);
    }
}

module.exports = { shortenUrl }