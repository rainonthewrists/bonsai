exports.handler = async (event, context) => {
    try {
        return {
            statusCode: 200,
            body: "Hello from Netlify Function!"
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
