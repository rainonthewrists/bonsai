const { RiTa } = require('rita');
const tracery = require('tracery-grammar');

exports.handler = async (event, context) => {
    try {
        // Получаем сид из query-параметров (например, ?seed=123)
        const seed = event.queryStringParameters.seed || Math.floor(Math.random() * 1000000);
        const myRng = new Math.seedrandom(seed);
        RiTa.randomSeed(seed);
        tracery.setRng(myRng);

        // Список гласных для функции replaceA
        const vowels = ["aa", "ae", "ah", "ao", "aw", "ay", "eh", "er", "ey", "ih", "iy", "ow", "oy", "uh", "uw"];

        // Список цветов (как в script.js)
        const traceryColors = [
            "ruby red", "fiery orange", "sun-kissed yellow", "verdant green", "sapphire blue",
            "regal purple", "blushing pink", "earthy brown", "misty gray", "raven black",
            "pure white", "oceanic turquoise", "royal magenta", "dreamy lavender", "mystic teal",
            "radiant gold", "shimmering silver", "olive grove", "charcoal embers", "nightfall indigo",
            "carmine red", "tangerine orange", "lemon yellow", "forest green", "electric blue",
            "amethyst purple", "fuchsia pink", "sienna brown", "smoky gray", "midnight black",
            "pearl white", "aqua turquoise", "orchid magenta", "lilac lavender", "mint teal",
            "metallic gold", "sparkling silver", "moss olive", "graphite charcoal", "deep indigo",
            "maroon red", "coral orange", "canary yellow", "lime green", "azure blue",
            "violet purple", "rose pink", "rusty brown", "slate gray", "ivory white",
            "crimson", "amber", "lemon", "olive", "teal",
            "violet", "rose", "umber", "pewter", "onyx",
            "ivory", "turquoise", "cerise", "lilac", "cyan",
            "gold", "platinum", "khaki", "ebony", "azure",
            "scarlet", "apricot", "lime", "fern", "cobalt",
            "orchid", "coral", "sienna", "slate", "jet",
            "pearl", "aquamarine", "lavender", "mint", "bronze",
            "silver", "jade", "garnet", "ruby", "topaz",
            "sapphire", "indigo", "mauve", "amber", "copper",
            "burgundy", "ivory", "quartz", "tangerine"
        ];

        // Функция replaceA (как в script.js)
        function replaceA(s) {
            if (!s.includes(" a ")) {
                return s;
            }
            let words = s.split(" ");
            for (let i = 0; i < words.length - 1; i++) {
                if (words[i] == "a") {
                    let w = words[i + 1];
                    let phone = RiTa.phones(w).split("-")[0];
                    if (vowels.includes(phone)) {
                        words[i] = "an";
                    }
                }
            }
            return words.join(" ");
        }

        // Грамматика (перенесена из script.js)
        let rules = {
            "origin": ["To be #phrase#."],
            "phrase": [
                "#noun-phrase#",
                "#noun-phrase#",
                "#noun-phrase#",
                "#verb-phrase#",
                "#adj-phrase#",
                "#sentences#",
                "#sentences#",
                "#sentences#",
                "#sentences#",
                "#sentences#",
                "#sentences#",
                "#sentences#",
                "#sentences#",
                "#sentences#",
                "#sentences#",
            ],
            "sentences": [
                "#s1#",
                "#s2#",
                "#s3#",
                "#s4#",
                "#my1#",
                "#my1#",
                "#my2#",
                "#my2#",
                "#my3#",
                "#my3#",
                "#my4#",
                "#my4#"
            ],
            "s1": ["#det# #adj2# #nn2# for #per-pro#"],
            "s2": ["a #adj# #nn# for #vbg#"],
            "s3": ["a #nn# #prep# #per-pro#"],
            "s4": ["a #adj-comp# #nn# #prep# #poss-pro# #nn2#"],
            "my1": ["loved for my #adj# #nn#", "loved in #adv# #vbg# ways"],
            "my2": ["#adj# and #adj2#"],
            "my3": ["#adv# #my2#"],
            "my4": ["#color#, to be a #color# #nn#"],
            "noun-phrase": [
                "#nns#",
                "#nn#",
                "#noun-single#",
                "#noun-single#",
                "#noun-single#",
                "#noun-single#",
                "#noun-single#",
                "#noun-single#",
                "#noun-single#",
                "#noun-single#",
                "#noun-single#",
                "#noun-single#",
                "#noun-single#"
            ],
            "noun-single": [
                "a #nn#",
                "a good #nn#",
                "a good #nn#",
                "a good #nn#",
                "a good #nn#",
                "a good #nn#",
                "a #adj# #nn#",
                "a #adj# #nn#",
                "a #adj# #nn#",
                "#prep# #nn#",
                "#adj# #prep# #poss-pro# #nn#",
                "one last #adj# #nn#",
                "one last #adj# #nn#",
                "one last #adj# #nn#",
                "one last #adj# #nn#",
                "one last #adj# #nn#",
                "one last #adj# #nn#",
                "one last #adj# #nn#",
                "one last #adj# #nn#",
                "one last #adj# #nn#",
                "one last #adj# #nn#",
                "one last #adj# #nn#"
            ],
            "verb-phrase": [
                "#verbs#",
                "#adv# #verbs#",
                "#adv# #verbs#",
                "#adv# #verbs#",
                "#adv# #verbs#",
                "#adv# #verbs#",
                "#adv# #verbs#",
                "#adv# #verbs#",
                "#adv# #verbs#",
                "#adv# #verbs#",
                "#adv# #verbs#",
                "#adv# #verbs#"
            ],
            "verbs": [
                "#vbg#",
                "#vbn#"
            ],
            "color": traceryColors,
            "adj-phrase": [
                "#adj#",
                "#adj-comp#",
                "the #adj-sup#",
                "#adv# #adj#",
                "#color# #adj#"
            ],
            "adv": [RiTa.randomWord({ pos: "rb" })],
            "vbg": [RiTa.randomWord({ pos: "vbg" })],
            "vbn": [RiTa.randomWord({ pos: "vbn" })],
            "nns": [RiTa.randomWord({ pos: "nns" })],
            "nn": [RiTa.randomWord({ pos: "nn" })],
            "nn2": [RiTa.randomWord({ pos: "nn" })],
            "adj": [RiTa.randomWord({ pos: "jj" })],
            "adj2": [RiTa.randomWord({ pos: "jj" })],
            "adj-comp": [RiTa.randomWord({ pos: "jjr" })],
            "adj-sup": [RiTa.randomWord({ pos: "jjs" })],
            "prep": [RiTa.randomWord({ pos: "in" })],
            "poss-pro": ["my", "your", "our", "their", "his", "her", "its"],
            "per-pro": ["you", "them", "her", "him", "us"],
            "det": ["another", "some", "that", "this", "every", "each"]
        };

        // Создаём грамматику
        const grammar = tracery.createGrammar(rules);
        grammar.addModifiers(tracery.baseEngModifiers);

        // Генерируем строку
        let result = grammar.flatten("#origin#");
        result = replaceA(result);

        // Возвращаем строку как ответ
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
