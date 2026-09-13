# Lamun tenant app

Expo + TypeScript + Expo Router app for iOS, Android and a browser preview.

## Run

Use Node.js 24 LTS and npm.

```sh
npm install
npm start
```

Scan the terminal QR code using an Expo Go version compatible with SDK 57. The phone and development machine should be on the same network. Alternatively, use `npm run ios` with Xcode and an iOS Simulator installed, or `npm run android` with an Android emulator configured.

```sh
npm run web       # browser preview
npm run check     # TypeScript and ESLint
npm test          # inbox filtering and unread behavior
npm run export    # bundle iOS, Android and web
```

## Current scope

- My home implements the approved compact condo card, conditional rent reminder and four-item menu.
- Pay rent shows the current sample rent amount and a selectable bank list. Bank choices are illustrative; no bank connection or payment is initiated.
- Maintenance, Payment, Tenancy details, Building info and Profile open placeholders with back navigation.
- Messages implements the approved mixed inbox with Chats/Updates, Unread and Include resolved filters. Resolved chats remain visible until their unread messages are read. The tab badge counts unread chat messages.
- Technician visit opens the sample chat, including a link to its separate maintenance ticket. Sending a reply updates this local demo and its inbox preview; nothing is transmitted. Replies and read states reset when the app reloads.
- Contact Lamun opens a reason selector, then Subject and Message fields. Send Message creates a separate local conversation; follow-up messages stay within their own thread. Other sample chats, attachment upload and destination screens remain placeholders. Living is a placeholder tab and remains a working name.
- No authentication, network requests, payment processing or persistence is implemented.

Sample tenancy and rent data live in `src/data/demo.ts`. This is a fixed September 2026 demo, not a live billing clock. Change `rent.status` to `paid` or `upcoming` to hide the reminder. The future billing service should supply the status, due date and label together.

## Structure

- `src/app/`: Expo Router screens and layouts.
- `src/components/`: reusable home screen and placeholder components.
- `src/constants/theme.ts`: shared colors.
- `src/data/`: sample tenancy and destination definitions.
- `assets/images/lamun-logo.svg`: original supplied vector logo; `src/constants/logo.ts` embeds the exact artwork for native rendering.
- `assets/images/condo.jpg`: bundled AI-generated sample architecture, not a verified image of The Lofts Asoke. All imagery works offline.

The browser version uses a centered mobile-width layout. Native builds use the device’s safe areas and system status bar, with scrollable content on smaller screens. The profile avatar uses sample initials.
