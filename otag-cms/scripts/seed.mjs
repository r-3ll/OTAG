// Imports the current site content into Sanity. Safe to re-run (uses fixed IDs, replaces).
// Usage: SANITY_WRITE_TOKEN=... node scripts/seed.mjs [--samples]
import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) { console.error('Set SANITY_WRITE_TOKEN'); process.exit(1); }
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'fdsg6tk5',
  dataset: process.env.SANITY_DATASET || 'test',
  apiVersion: '2024-01-01', token, useCdn: false,
});
const here = path.dirname(fileURLToPath(import.meta.url));
const imgDir = path.join(here, '..', 'public', 'images');
const cache = {};
async function upload(n) {
  if (cache[n]) return cache[n];
  const f = `image-${String(n).padStart(2, '0')}.jpg`;
  const a = await client.assets.upload('image', readFileSync(path.join(imgDir, f)), { filename: f });
  return (cache[n] = { _type: 'image', asset: { _type: 'reference', _ref: a._id } });
}
let k = 0;
const key = () => 'k' + (k++);
// rich text helper: segments are strings or ['bold text']
const block = (...segs) => {
  const children = segs.map((s) => Array.isArray(s)
    ? { _type: 'span', _key: key(), text: s[0], marks: ['strong'] }
    : { _type: 'span', _key: key(), text: s, marks: [] });
  return { _type: 'block', _key: key(), style: 'normal', markDefs: [], children };
};

const docs = [];
docs.push({
  _id: 'siteSettings', _type: 'siteSettings',
  heroLabel: 'Old Trafford, Manchester',
  heroHeading: 'Making Old Trafford a cleaner, greener place to',
  heroHeadingEmphasis: 'live',
  heroDescription: "We're a residents' group taking direct action and putting pressure on Trafford Council and Amey to do the same. Everyone is welcome.",
  aboutText: [
    block('Old Trafford Action Group (OTAG) aims to improve the environment of the Old Trafford area.'),
    block('We do this by ', ['lobbying the local council'], ' directly and working alongside existing pressure groups and community organisations across the area.'),
    block('We meet every three months with Amey, Trafford managers, and local councillors, and we encourage residents to get involved in practical work on the ground: from litter picking to gardening and growing.'),
  ],
  aims: [
    'Lobby Trafford Council and Amey directly on behalf of residents',
    'Meet every three months with Amey, Trafford managers, and councillors',
    'Organise litter picks and gardening work across the area',
    'Educate residents on growing fruit and vegetables',
    'Work alongside other local groups to improve Old Trafford',
  ],
  meetingsText: [
    block("Our meetings are open to all residents. Come along to find out what we're working on, raise issues affecting your street, or just meet your neighbours."),
    block("You don't need any experience or prior commitment. Just turn up."),
  ],
  meetingsNote: "We meet every three months with Amey, Trafford managers, and local councillors. Dates and locations are being confirmed — get in touch and we'll let you know as soon as details are set.",
  newsEmptyTitle: 'Updates coming soon',
  newsEmptyText: "We'll be posting news, event updates, and reports from our council meetings here. Check back shortly.",
  membershipText: [
    block("Membership is free and open to all Old Trafford residents. Whether you want to get stuck in at a litter pick, join us at a council meeting, or simply stay informed about what's happening in your area: there's a place for you."),
    block("Leave your details and we'll send you information about the group and how to get involved."),
  ],
  communityIntro: "We're part of a wider network of groups working to improve Old Trafford. We're proud to support them all.",
  contactIntro: "Have a question, want to get involved, or want to report an issue in Old Trafford? Fill in the form and we'll get back to you.",
});

const slides = [[1, 'Park pathway with flowering rhododendrons in Old Trafford'], [2, 'Green park bench under cherry blossom trees in Old Trafford'], [3, 'Picnic table in well-maintained park in Old Trafford']];
for (const [i, [n, alt]] of slides.entries()) docs.push({ _id: `heroSlide-${n}`, _type: 'heroSlide', order: i + 1, alt, image: await upload(n) });

const gi = async (n, alt, tag) => ({ _type: 'galleryPhoto', _key: key(), image: await upload(n), alt, tag });
docs.push({
  _id: 'workProject-seymour', _type: 'workProject', order: 1, title: 'Seymour Park', portrait: false,
  intro: 'Drag the slider to see the before and after at Seymour Park, cleared, tidied, and maintained by OTAG volunteers.',
  before: await upload(5), after: await upload(4),
  gallery: [await gi(6, 'During the clean-up at Seymour Park', 'During'), await gi(7, 'Seymour Park fence cleared after clean-up', 'After'), await gi(8, 'Seymour Park entrance sign after clean-up', 'After')],
});
docs.push({
  _id: 'workProject-hullard', _type: 'workProject', order: 2, title: 'Hullard Park', portrait: true,
  intro: "Volunteers cleared and tidied the area around the picnic tables at Hullard Park — here's how it looked.",
  gallery: [await gi(9, 'Hullard Park before clean-up', 'Before'), await gi(10, 'During clean-up at Hullard Park', 'During'), await gi(3, 'Hullard Park after clean-up', 'After')],
});

const groups = [
  ['Love Old Trafford', 'https://loveoldtrafford.wordpress.com'],
  ['We Love Old Trafford', 'https://www.facebook.com/groups/1633806703574438/'],
  ['Love Old Trafford Forum', null],
  ['M16 Old Trafford', null],
  ['OT Creative Space', 'https://otcreativespace.co.uk'],
  ['Keep Old Trafford Tidy', 'https://www.facebook.com/groups/keepottidy/'],
];
groups.forEach(([name, url], i) => docs.push({ _id: `group-${i + 1}`, _type: 'group', order: i + 1, name, ...(url ? { url } : {}) }));

if (process.argv.includes('--samples')) {
  docs.push({
    _id: 'sample-news-1', _type: 'newsPost', title: 'SAMPLE: Spring litter pick at Seymour Park', date: '2026-10-01',
    summary: 'Example news post to show how news appears. Delete or edit it in the Studio.',
    body: [block('This is a sample post created for testing. Edit or delete it in the Studio.')],
    image: await upload(6), imageAlt: 'Volunteers during the clean-up at Seymour Park',
  });
  docs.push({ _id: 'sample-meeting-1', _type: 'meeting', title: 'SAMPLE: Quarterly meeting with Amey and Trafford', date: '2026-12-10T18:30:00Z', location: 'Sample venue, Old Trafford', details: 'Example meeting to show how dates appear.' });
}

const tx = client.transaction();
docs.forEach((d) => tx.createOrReplace(d));
const res = await tx.commit();
console.log('Imported', docs.length, 'documents,', Object.keys(cache).length, 'images');
