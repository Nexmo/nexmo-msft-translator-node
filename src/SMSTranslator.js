const Nexmo = require('nexmo')
const request = require('Request')

class SMSTranslator {
    constructor({nexmoApiKey, nexmoApiSecret, msftApiKey, debug = false}) {
        this.nexmoApiKey = nexmoApiKey
        this.nexmoApiSecret = nexmoApiSecret
        this.msftApiKey = msftApiKey

        this.nexmo = new Nexmo({
            apiKey: this.nexmoApiKey,
            apiSecret: this.nexmoApiSecret
        }, {debug: debug})
    }

    sendSms({to, from, translateToLang, text}, callback) {

        console.log('translateToLang', translateToLang)

        let options = {
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': this.msftApiKey
            },
            body: JSON.stringify([{ 'Text': text }])
        }
        
        request.post(`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&To=${translateToLang}`, options, (err, res, body) => {
            if (err) callback(err)

            // if non-200 then the translation has failed and the body contains the error details
            if(res.statusCode !== 200) callback(body)
        
            // full response [{"detectedLanguage":{"language":"en","score":1.0},"translations":[{"text":"Un mensaje de texto enviado mediante la API de SMS de Nexmo","to":"es"}]}]
            let translatedText = JSON.parse(body)[0].translations[0].text
        
            this.nexmo.message.sendSms(from, to, translatedText, callback)
        })
    }
}

module.exports = SMSTranslator