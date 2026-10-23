# Satoru Ojo WhatsApp MD-Bot

A minimal WhatsApp Multi-Device bot starter for a Satoru Ojo style command set.

Features included:
- Group management commands
- Media downloader commands
- Quiz, poll, and fun commands
- Menu/help output
- In-memory state for warns, quiz, and poll data

## Requirements
- Node.js 18+
- A WhatsApp account that can scan QR code from the terminal
- Internet access to connect to WhatsApp and downloader APIs

## Install

```bash
npm install
cp .env.example .env
```

## Run

```bash
npm start
```

Then scan the QR code in the terminal with your WhatsApp app.

## Default prefix

The bot responds to these prefixes:

- `!`
- `/`
- `.`

## Example commands

```text
!menu
!groupinfo
!warn @user spam
!play never gonna give you up
!quiz who is the main character of One Piece?
!poll Which game do you like more? | Valorant | Minecraft | PUBG
!ping
```

## Notes

This starter is built for the command structure you provided. Several commands are intentionally implemented as production-ready skeletons with command validation and stateful responses, while media download commands are prepared to integrate with a real download API or service.

## Security note

For production use, add authentication for owner-only commands, persist data to a database, and validate external media download sources.
