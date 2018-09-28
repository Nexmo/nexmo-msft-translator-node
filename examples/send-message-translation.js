const Nexmo = require('nexmo');
const request = require('Request');

const nexmo = new Nexmo({
    apiKey: NEXMO_API_KEY,
    apiSecret: NEXMO_API_SECRET
});

let options = {
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': MSFT_API_KEY
    },
    body: JSON.stringify([{ 'Text': 'An example message sent from the Nexmo API' }])
}

// Change to any language code to translate in different language. Currently set to Soanish (es)
let lang = '&to=es';

request.post(`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0${lang}`, options, (err, res, body) => {
    if (err) throw err;

    // full response [{"detectedLanguage":{"language":"en","score":1.0},"translations":[{"text":"Un mensaje de texto enviado mediante la API de SMS de Nexmo","to":"es"}]}]
    let translatedText = JSON.parse(body)[0].translations[0].text;

    let from = FROM_NUMBER;
    let to = TO_NUMBER;

    nexmo.message.sendSms(from, to, translatedText, (err, res) => {
        if (err) throw err;
        console.log(res);
    });
});

