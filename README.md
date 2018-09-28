# Nexmo - Microsoft Translator - Node Examples

This repo contains example code to help you with combining Nexmo APIs and the Microsoft Translator service.

If you have any questions, send an email to devrel@nexmo.com.

## To run the examples

Navigate to the `examples` directory.

```sh
$ cd examples
```

Create a `.env` file from the `.env-example`:

```sh
$ cp .env-example .env
```

Add your Nexmo and Microsoft credentials to the relevant properties in the `.env` file.

Create a Nexmo Application. To do this you'll need to [nexmo-cli](https://github.com/nexmo/nexmo-cli) installed.

```sh
$ nexmo app:create "My Nexmo and Microsoft translations examples" https://example.com/answer https://example.com/event --keyfile=exa
```

Run the examples e.g.

```sh
$ node send-message-translation.js
```

