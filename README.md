# Nexmo - Microsoft Translator - Node Examples

This repo contains example code to help you with combining Nexmo APIs and the Microsoft Translator service.

## Setting up the Examples

### Setup Nexmo Account and Application

1. Signup/in to a [Nexmo account](https://dashboard.nexmo.com/sign-up) and setup a [number](https://dashboard.nexmo.com/your-numbers).
2. Create an application with the [Nexmo dashboard](https://dashboard.nexmo.com/voice/your-applications) or [Nexmo CLI](https://github.com/Nexmo/nexmo-cli).
```sh
> nexmo app:create "Nexmo MSFT Translator Examples" https://example.com/answer https://example.com/event --keyfile=private.key
```
3. Rename `constants.js-example` to `constants.js`
4. Update `NEXMO_API_KEY`, `NEXMO_API_SECRET`, `NEXMO_APPLICATION_ID`, `NEXMO_APPLICATION_PRIVATE_KEY`, `FROM_NUMBER` in `constants.js` with your account details.

### Setting up Azure and Translator Text API

1. Follow [these directions](https://docs.microsoft.com/en-us/azure/cognitive-services/translator/translator-text-how-to-signup) to create an Azure account enable Translator Text API.
2. Update `MSFT_API_KEY` in `constants.js` with your account details.

### Run Examples

1. Update the `TO_NUMBER` with your mobile phone number.
2. Run either example:

```sh
> node examples/send-message-translation.js
{ message_uuid: '00000000-0000-0000-0000-000000000000' }
> node examples/send-sms-translation.js
{ 'message-count': '1',
  messages:
   [ { to: '##########',
       'message-id': '############',
       status: '0',
       'remaining-balance': '$$',
       'message-price': '$$',
       network: '#####' } ] }
```

## Support
If you have any questions, send an email to devrel@nexmo.com.