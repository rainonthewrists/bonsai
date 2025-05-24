const { RiTa } = require('rita');

exports.handler = async (event, context) => {
    try {
        const word = RiTa.randomWord({ pos: "nn" }); // Генерируем случайное существительное
        return {
            statusCode: 200,
            body: `Generated word: ${word}`
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
