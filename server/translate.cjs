const fetch = require("node-fetch");
const extractTranslations = (data) => {
    let Translations = [];

    // Check if the response structure is valid
    if (Array.isArray(data) && Array.isArray(data[0])) {
        for (let item of data[0]) {
            if (Array.isArray(item) && item.length > 0) {
                Translations.push(item[0]);
            }
        }
    }

    return Translations;
};


exports.translateGoogleFree = async function translateGoogleFree(text, targetLang) {
    const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
    const data = await response.json();

    const translatedText = extractTranslations(data);
    return translatedText;
}


