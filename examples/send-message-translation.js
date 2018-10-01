const Nexmo = require('nexmo');
const request = require('Request');
const {
    NEXMO_API_KEY,
    NEXMO_API_SECRET,
    MSFT_API_KEY,
    NEXMO_APPLICATION_ID,
    NEXMO_APPLICATION_PRIVATE_KEY,
    FROM_NUMBER,
    TO_NUMBER } = require('../constants');

const nexmo = new Nexmo({
    apiKey: NEXMO_API_KEY,
    apiSecret: NEXMO_API_SECRET,
    applicationId: NEXMO_APPLICATION_ID,
    privateKey: NEXMO_APPLICATION_PRIVATE_KEY
})

let options = {
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': MSFT_API_KEY
    },
    body: JSON.stringify([{ 'Text': 'An example message sent from the Nexmo API' }])
}

// Change to any language code to translate in different language. Currently set to Spanish (es)
let lang = '&to=es';

request.post(`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0${lang}`, options, (err, res, body) => {
    if (err) throw err;

    // full response [{"detectedLanguage":{"language":"en","score":1.0},"translations":[{"text":"Un mensaje de texto enviado mediante la API de SMS de Nexmo","to":"es"}]}]
    let translatedText = JSON.parse(body)[0].translations[0].text;

    nexmo.channel.send(
        { "type": "sms", "number": TO_NUMBER },
        { "type": "sms", "number": FROM_NUMBER },
        {
            "content": {
                "type": "text",
                "text": translatedText
            }
        },
        (err, data) => { console.log(data); }
    );
});

