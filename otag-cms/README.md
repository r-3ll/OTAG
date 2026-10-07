# OTAG site (Astro + Sanity) - TEST VERSION

Flow: group edits in Sanity Studio -> Sanity webhook triggers a Netlify build -> Astro fetches content from Sanity at build time -> Netlify publishes.

- `src/` Astro site (all text, news, meetings, photos come from Sanity; original wording is the fallback if a field is empty)
- `studio/` Sanity Studio (project fdsg6tk5, dataset `test`). Deploy: `cd studio && SANITY_AUTH_TOKEN=... npx sanity deploy`
- `scripts/seed.mjs` one-off import of current content + photos (`SANITY_WRITE_TOKEN=... npm run seed -- --samples`)
- Forms: OFF in test mode. They only post if `PUBLIC_FORM_ENDPOINT` is set (set it to the Apps Script URL on the LIVE site only).

Netlify env vars: SANITY_PROJECT_ID=fdsg6tk5, SANITY_DATASET=test (use `production` for live), PUBLIC_FORM_ENDPOINT (live only).
Rebuild on edit: Netlify > Build hooks > create hook; Sanity > API > Webhooks > add the hook URL (trigger on create/update/delete).
Do not push to main until the test preview is approved.

## Hosted test Studio

Studio: https://otag-test.sanity.studio/ (sign in with your Sanity account).
Low-memory build: `cd studio && npm ci && npx sanity build --no-minify -y && npx sanity manifest extract && npx sanity deploy --no-build`. Uses Sanity auto-update runtime modules. Deployment tokens are not included.
