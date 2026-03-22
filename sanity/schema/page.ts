import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required().unique(),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'string',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'featureGrid' },
        { type: 'metricsBar' },
        { type: 'contentBlock' },
        { type: 'ctaSection' },
      ],
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['draft', 'published', 'archived'],
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'lastUpdatedBy',
      title: 'Last Updated By',
      type: 'string',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeZone: 'UTC',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: `Status: ${selection.status}`,
      };
    },
  },
});
