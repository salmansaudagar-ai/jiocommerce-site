import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'customer',
  title: 'Customer',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: ['internal', 'external', 'partner'],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'vertical',
      title: 'Vertical',
      type: 'string',
      description: 'Industry or vertical (e.g., retail, fintech, healthcare)',
    }),
    defineField({
      name: 'caseStudyRef',
      title: 'Case Study',
      type: 'reference',
      to: [{ type: 'post' }],
      description: 'Link to related case study post',
    }),
    defineField({
      name: 'highlightMetric',
      title: 'Highlight Metric',
      type: 'reference',
      to: [{ type: 'metric' }],
      description: 'Key metric to display for this customer',
    }),
    defineField({
      name: 'displayOn',
      title: 'Display On',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        list: [
          { title: 'Home Page', value: 'home' },
          { title: 'Platform Page', value: 'platform' },
          { title: 'Solutions Page', value: 'solutions' },
          { title: 'Footer', value: 'footer' },
        ],
      },
      description: 'Pages where this customer logo appears',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      type: 'type',
      vertical: 'vertical',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: `${selection.type} - ${selection.vertical || 'No vertical'}`,
      };
    },
  },
});
