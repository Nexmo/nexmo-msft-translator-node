require('dotenv').load();

const MessagingTranslator = require('../src/MessagingTranslator')

const translator = new MessagingTranslator({
    nexmoApiKey: process.env.NEXMO_API_KEY,
    nexmoApiSecret: process.env.NEXMO_API_SECRET,
    nexmoApplicationId: process.env.NEXMO_APPLICATION_ID,
    nexmoPrivateKey: process.env.NEXMO_PRIVATE_KEY,
    msftApiKey: process.env.MSFT_API_KEY,
    debug: true
})

translator.sendSms({to: process.env.TO_NUMBER, from: process.env.FROM_NUMBER, translateToLang: 'es', text: 'I like to move it move it'}, (err, result) => {
    if(err) console.error(err)

    console.log(result)
})

