# Love Calculator Website

This project recreates the supplied Love Calculator design and adds:

- Name + gender fields for both people
- A compatibility result that is always between **80% and 100%**
- Submission details sent to **rreddykumar310@gmail.com**
- Responsive mobile layout
- A backend endpoint so the SMTP password is never exposed in browser JavaScript

## Run locally

1. Install Node.js 18+.
2. Open this project folder in a terminal.
3. Run:

   npm install

4. Copy `.env.example` to `.env`.
5. Put your SMTP provider details in `.env`.
6. Start:

   npm start

7. Open `http://localhost:3000`.

## Email setup

The website needs an SMTP account to send email. Do not put an email password in `public/app.js`.

For Gmail/Google Workspace, use an App Password (with the appropriate account security setup), then use:

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail-address
SMTP_PASS=your-16-character-app-password
SMTP_FROM=your-gmail-address

The destination is already set to:

rreddykumar310@gmail.com

## Deploy

Deploy the Node.js app to a service that supports Node/Express. Add the same environment variables in the hosting service's Environment Variables/Secrets section.

The score is generated in the browser from 80-100. If you want the score generated securely on the server instead, move `makeScore()` into `server.js`.


## Deploy online on Render

This project is prepared for a Render Node.js Web Service. Render provides a public `onrender.com` URL for deployed web services and supports environment variables/secrets in the dashboard.

1. Put this project in a GitHub repository.
2. In Render, choose **New → Web Service** and connect the repository.
3. Use:
   - Runtime: `Node`
   - Build command: `npm install`
   - Start command: `npm start`
   - Plan: `Free`
4. Add these environment variables:
   - `EMAIL_TO` = `rreddykumar310@gmail.com`
   - `SMTP_HOST` = your mail provider SMTP host
   - `SMTP_PORT` = `587`
   - `SMTP_SECURE` = `false`
   - `SMTP_USER` = your SMTP account
   - `SMTP_PASS` = your SMTP app password
   - `SMTP_FROM` = your SMTP account
5. Deploy. Render will give you a public `https://<service-name>.onrender.com` address.

The included `render.yaml` documents the same configuration.

Do not put SMTP passwords in `app.js`, HTML, or GitHub. Keep them as Render environment variables.
