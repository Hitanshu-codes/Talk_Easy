const fetch = require("node-fetch");

exports.translateGoogleFree = async function translateGoogleFree(text, targetLang) {
    const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
    const data = await response.json();
    console.log(data[0][0][0]);
    const translatedText = data[0][0][0];
    return translatedText;
}


