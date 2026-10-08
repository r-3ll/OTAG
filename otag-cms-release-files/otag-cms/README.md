# OTAG site (Astro + Sanity) - CMS release

Flow: group edits in Sanity Studio -> Sanity webhook triggers a Netlify build -> Astro fetches content from Sanity at build time -> Netlify publishes.

- `src/` Astro site (all text, news, meetings, photos come from Sanity; original wording is the fallback if a field is empty)
- `studio/` Sanity Studio (project fdsg6tk5, dataset `test`). Deploy: `cd studio && SANITY_AUTH_TOKEN=... npx sanity deploy`
- `scripts/seed.mjs` one-off import of current content + photos (`SANITY_WRITE_TOKEN=... npm run seed -- --samples`)
- Forms: membership and contact post to the existing live Google Apps Script endpoint. No test-mode banner or simulated submission path remains. The endpoint is public frontend configuration, not a secret.

Sanity project: fdsg6tk5. Keep the existing dataset named `test` as the live dataset, as agreed. No migration to `production`. Both Netlify configs pin these non-secret settings.

The root `netlify.toml` sets base `otag-cms`, build `npm run build`, publish `dist`, and Node 20. The original subfolder config is retained. No dashboard build-setting changes are needed when the existing settings are empty.
Rebuild on edit: Netlify > Build hooks > create hook; Sanity > API > Webhooks > add the hook URL (trigger on create/update/delete).
Release branch: `release/cms-live`, based on `test/astro-sanity`. Leave `main` untouched as rollback. Changing Netlify production branch is a separate user action.

Membership receipt was confirmed by the owner on 7 October 2026. Contact receipt is not yet tested. A browser thank-you is not proof of saving because the endpoint uses no-cors.

## Hosted test Studio

Studio: https://otag-test.sanity.studio/ (sign in with your Sanity account).
Low-memory build: `cd studio && npm ci && npx sanity build --no-minify -y && npx sanity manifest extract && npx sanity deploy --no-build`. Uses Sanity auto-update runtime modules. Deployment tokens are not included.
