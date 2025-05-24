const { RiTa } = require('rita');
const tracery = require('tracery-grammar');
const seedrandom = require('seedrandom');

exports.handler = async (event, context) => {
    try {
        // Получаем seed из URL-параметра или генерируем случайный
        const seed = event.queryStringParameters.seed || Math.floor(Math.random() * 1000000);
        const myRng = new seedrandom(seed);
        // RiTa.randomSeed(seed); // Пропускаем, если не работает, используем myRng

        const vowels = ["aa", "ae", "ah", "ao", "aw", "ay", "eh", "er", "ey", "ih", "iy", "ow", "oy", "uh", "uw"];

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

        // Функция replaceA из вашего скрипта
        function replaceA(s) {
            if (!s.includes(" a ")) {
                return s;
            }
            let words = s.split(" ");
            for (let i = 0; i < words.length - 1; i++) {
                if (words[i] === "a") {
                    let w = words[i + 1];
                    let phone = RiTa.phones(w).split("-")[0];
                    if (vowels.includes(phone)) {
                        words[i] = "an";
                    }
                }
            }
            return words.join(" ");
        }

        // Массивы слов для замены RiTa.randomWord()
        const adverbs = ["quickly", "silently", "brightly", "gently"];
        const verbs = ["run", "shine", "flow", "dance"];
        const vbg = ["running", "shining", "flowing", "dancing"];
        const vbn = ["run", "shone", "flowed", "danced"];
        const vbz = ["runs", "shines", "flows", "dances"];
        const nns = ["dogs", "cats", "birds", "trees"];
        const nn = ["dog", "cat", "bird", "tree"];
        const adj = ["happy", "bright", "quiet", "golden"];
        const adj2 = ["joyful", "radiant", "calm", "shiny"];
        const adjComp = ["happier", "brighter", "quieter"];
        const adjSup = ["happiest", "brightest", "quietest"];
        const prep = ["in", "for", "with", "by"];
        const possPro = ["my", "your", "our", "their", "his", "her", "its"];
        const perPro = ["you", "them", "her", "him", "us"];
        const det = ["another", "some", "that", "this", "every", "each"];

        // Грамматика из вашего скрипта, адаптированная для Tracery
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
                "#sentences#"
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
            "verbs": ["#vbg#", "#vbn#"],
            "color": traceryColors,
            "adj-phrase": [
                "#adj#",
                "#adj-comp#",
                "the #adj-sup#",
                "#adv# #adj#",
                "#color# #adj#"
            ],
            "adv": () => RiTa.select(adverbs),
            "vbg": () => RiTa.select(vbg),
            "vbn": () => RiTa.select(vbn),
            "nns": () => RiTa.select(nns),
            "nn": () => RiTa.select(nn),
            "nn2": () => RiTa.select(nn),
            "adj": () => RiTa.select(adj),
            "adj2": () => RiTa.select(adj2),
            "adj-comp": () => RiTa.select(adjComp),
            "adj-sup": () => RiTa.select(adjSup),
            "prep": () => RiTa.select(prep),
            "poss-pro": possPro,
            "per-pro": perPro,
            "det": det
        };

        const grammar = tracery.createGrammar(rules);
        tracery.setRng(myRng);
        grammar.addModifiers(tracery.baseEngModifiers);

        let result = grammar.flatten("#origin#");
        result = replaceA(result);

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
