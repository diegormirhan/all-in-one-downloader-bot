const axios = require('axios');

const getFileSize = async (url) => {
    try {
        const response = await axios.head(url);
        const contentLength = response.headers['content-length'];
        if (contentLength) {
            return parseInt(contentLength, 10);
        } else {
            console.log('Error trying to get content length');
        }
    } catch (error) {
        console.log('Erro ao buscar o tamanho do arquivo', error);
    }
}

module.exports = { getFileSize }