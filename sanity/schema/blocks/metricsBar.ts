import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'metricsBar',
  title: 'Metrics Bar',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'metricRefs',
      title: 'Metrics',
      type: 'array',
      of: [
        defineField({
          type: 'reference',
          to: [{ type: 'metric' }],
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Metrics Bar',
        subtitle: 'Metrics Bar',
      };
    },
  },
});
