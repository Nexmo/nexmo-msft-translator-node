const Nexmo = require('nexmo')
const request = require('Request')

class MessagingTranslator {
    constructor({nexmoApiKey, nexmoApiSecret, nexmoApplicationId, nexmoPrivateKey, msftApiKey, debug = false}) {
        this.msftApiKey = msftApiKey

        this.nexmo = new Nexmo({
            apiKey: nexmoApiKey,
            apiSecret: nexmoApiSecret,
            applicationId: nexmoApplicationId,
            privateKey: nexmoPrivateKey
        }, {debug: debug})
    }

    sendSms({to, from, translateToLang, text}, callback) {
        this.send({toId: to, fromId: from, translateToLang: translateToLang, channel: 'sms', text: text}, callback)
    }

    send({toId, fromId, channel = 'sms', translateToLang, text}, callback) {

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
        
            const toIdParamNameLookup = {
                sms: 'number',
                messenger: 'id',
                whatsapp: 'number',
                viber: 'id'
            }
    
            const fromIdParamNameLookup = {
                sms: 'number',
                messenger: 'id',
                whatsapp: 'number',
                viber: 'number'
            }
    
            const from = { "type": channel }
            from[ fromIdParamNameLookup[channel] ] = fromId
    
            const to = { "type": channel }
            to[ toIdParamNameLookup[channel] ] = toId
    
            this.nexmo.channel.send(
                to,
                from,
                {
                  "content": {
                    "type": "text",
                    "text": translatedText
                  }
                },
                callback
              );
        })
    }
}

module.exports = MessagingTranslator