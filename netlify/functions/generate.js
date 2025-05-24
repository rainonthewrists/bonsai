const { RiTa } = require('rita');
const tracery = require('tracery-grammar');
const seedrandom = require('seedrandom');

exports.handler = async (event, context) => {
    try {
        const seed = event.queryStringParameters.seed || Math.floor(Math.random() * 1000000);
        const myRng = new seedrandom(seed);

        const traceryColors = [
            "ruby red", "fiery orange", "sun-kissed yellow", "verdant green", "sapphire blue"
        ];
        const adjectives = ["happy", "bright", "quiet"];
        const nouns = ["star", "river", "forest"];

        let rules = {
            "origin": ["To be a #adj# #nn#."],
            "adj": () => RiTa.select(adjectives),
            "nn": () => RiTa.select(nouns)
        };

        const grammar = tracery.createGrammar(rules);
        tracery.setRng(myRng);
        grammar.addModifiers(tracery.baseEngModifiers);

        let result = grammar.flatten("#origin#");

        return {
            statusCode: 200,
            body: result
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
