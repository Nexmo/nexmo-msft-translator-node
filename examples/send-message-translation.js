require('dotenv').load();

const SMSTranlator = require('../src/SMSTranslator')

const translator = new SMSTranlator({
    nexmoApiKey: process.env.NEXMO_API_KEY,
    nexmoApiSecret: process.env.NEXMO_API_SECRET,
    msftApiKey: process.env.MSFT_API_KEY
})

translator.sendSms({to: process.env.TO_NUMBER, from: process.env.FROM_NUMBER, translateToLang: 'es', text: 'I like to move it move it'}, (err, result) => {
    if(err) throw err

    console.log(result)
})

