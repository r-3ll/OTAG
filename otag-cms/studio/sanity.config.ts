import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

const singletons = ['siteSettings'];

export default defineConfig({
  name: 'otag',
  title: 'OTAG Website (test)',
  projectId: 'fdsg6tk5',
  dataset: 'test',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list().title('Website').items([
          S.listItem().title('Site text').id('siteSettings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
          S.divider(),
          S.documentTypeListItem('newsPost').title('News'),
          S.documentTypeListItem('meeting').title('Meetings'),
          S.documentTypeListItem('workProject').title('Our work (photos)'),
          S.documentTypeListItem('heroSlide').title('Home page photos'),
          S.documentTypeListItem('group').title('Community groups'),
        ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (t) => t.filter(({ schemaType }) => !singletons.includes(schemaType)),
  },
  document: {
    actions: (input, ctx) => (singletons.includes(ctx.schemaType) ? input.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action)) : input),
  },
});
