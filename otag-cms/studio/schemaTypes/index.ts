import { defineType, defineField, defineArrayMember } from 'sanity';

const richText = defineArrayMember({
  type: 'block',
  styles: [{ title: 'Normal', value: 'normal' }],
  lists: [{ title: 'Bullets', value: 'bullet' }],
  marks: { decorators: [{ title: 'Bold', value: 'strong' }, { title: 'Italic', value: 'em' }], annotations: [{ name: 'link', type: 'object', title: 'Link', fields: [{ name: 'href', type: 'url', title: 'URL' }] }] },
});

export const siteSettings = defineType({
  name: 'siteSettings', title: 'Site text', type: 'document',
  fields: [
    defineField({ name: 'heroLabel', title: 'Small label above the headline', type: 'string' }),
    defineField({ name: 'heroHeading', title: 'Headline', type: 'string' }),
    defineField({ name: 'heroHeadingEmphasis', title: 'Last word of headline (underlined)', type: 'string' }),
    defineField({ name: 'heroDescription', title: 'Headline paragraph', type: 'text', rows: 3 }),
    defineField({ name: 'aboutText', title: 'About us text', type: 'array', of: [richText] }),
    defineField({ name: 'aims', title: 'What we do (list)', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'meetingsText', title: 'Meetings intro', type: 'array', of: [richText] }),
    defineField({ name: 'meetingsNote', title: 'Text shown when no meetings are scheduled', type: 'text', rows: 3 }),
    defineField({ name: 'newsEmptyTitle', title: 'News: heading when empty', type: 'string' }),
    defineField({ name: 'newsEmptyText', title: 'News: text when empty', type: 'text', rows: 3 }),
    defineField({ name: 'membershipText', title: 'Membership text', type: 'array', of: [richText] }),
    defineField({ name: 'communityIntro', title: 'Community intro', type: 'text', rows: 2 }),
    defineField({ name: 'contactIntro', title: 'Contact intro', type: 'text', rows: 3 }),
  ],
  preview: { prepare: () => ({ title: 'Site text' }) },
});

export const newsPost = defineType({
  name: 'newsPost', title: 'News post', type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'date', title: 'Date', type: 'date', validation: (r) => r.required() }),
    defineField({ name: 'summary', title: 'Short summary', type: 'text', rows: 2 }),
    defineField({ name: 'body', title: 'Full text', type: 'array', of: [richText] }),
    defineField({ name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'imageAlt', title: 'Photo description', type: 'string' }),
  ],
  orderings: [{ title: 'Newest first', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'date', media: 'image' } },
});

export const meeting = defineType({
  name: 'meeting', title: 'Meeting', type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'date', title: 'Date and time', type: 'datetime', validation: (r) => r.required() }),
    defineField({ name: 'location', type: 'string' }),
    defineField({ name: 'details', title: 'Extra details', type: 'text', rows: 2 }),
  ],
  orderings: [{ title: 'Soonest first', name: 'dateAsc', by: [{ field: 'date', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'date' } },
});

export const heroSlide = defineType({
  name: 'heroSlide', title: 'Home page photo', type: 'document',
  fields: [
    defineField({ name: 'image', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: 'alt', title: 'Photo description', type: 'string' }),
    defineField({ name: 'order', title: 'Order (1 = first)', type: 'number' }),
  ],
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'alt', subtitle: 'order', media: 'image' } },
});

export const workProject = defineType({
  name: 'workProject', title: 'Our work: park', type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Park name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'intro', type: 'text', rows: 3 }),
    defineField({ name: 'before', title: 'Before photo (for the drag slider, optional)', type: 'image' }),
    defineField({ name: 'after', title: 'After photo (for the drag slider, optional)', type: 'image' }),
    defineField({ name: 'portrait', title: 'Show gallery photos as tall portraits', type: 'boolean', initialValue: false }),
    defineField({
      name: 'gallery', title: 'Gallery photos', type: 'array',
      of: [defineArrayMember({ type: 'object', name: 'galleryPhoto', fields: [
        defineField({ name: 'image', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
        defineField({ name: 'alt', title: 'Photo description', type: 'string' }),
        defineField({ name: 'tag', title: 'Label', type: 'string', options: { list: ['Before', 'During', 'After'] } }),
      ], preview: { select: { title: 'alt', subtitle: 'tag', media: 'image' } } })],
    }),
    defineField({ name: 'order', title: 'Order (1 = first)', type: 'number' }),
  ],
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
});

export const group = defineType({
  name: 'group', title: 'Community group', type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'url', title: 'Website (optional)', type: 'url' }),
    defineField({ name: 'order', title: 'Order', type: 'number' }),
  ],
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
});

export const schemaTypes = [siteSettings, newsPost, meeting, heroSlide, workProject, group];
