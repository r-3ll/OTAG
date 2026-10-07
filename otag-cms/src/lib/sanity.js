import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { toHTML } from '@portabletext/to-html';

export const client = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID || 'fdsg6tk5',
  dataset: import.meta.env.SANITY_DATASET || 'test',
  apiVersion: '2024-01-01',
  useCdn: false,
});
const builder = imageUrlBuilder(client);
export const img = (src, w = 1200) => (src ? builder.image(src).width(w).auto('format').url() : null);
export const html = (blocks) => (blocks && blocks.length ? toHTML(blocks) : null);
export const fmtDate = (d, withTime = false) =>
  d ? new Date(d).toLocaleDateString('en-GB', { weekday: withTime ? 'long' : undefined, day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/London' }) : '';
export const fmtTime = (d) => (d ? new Date(d).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London' }) : '');
