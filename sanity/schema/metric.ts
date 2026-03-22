import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'metric',
  title: 'Metric',
  type: 'document',
  fields: [
    defineField({
      name: 'key',
      title: 'Key',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Unique identifier for this metric (e.g., "gdp-2024", "user-growth")',
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The metric value (e.g., "$1.2B", "150%", "50M+")',
    }),
    defineField({
      name: 'displayLabel',
      title: 'Display Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Human-readable label for the metric',
    }),
    defineField({
      name: 'displayLocation',
      title: 'Display Location',
      type: 'string',
      options: {
        list: ['hero', 'metrics-bar', 'footer', 'multiple'],
      },
      description: 'Where this metric should appear on the site',
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'Source of the metric data',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      },
    }),
  ],
  preview: {
    select: {
      displayLabel: 'displayLabel',
      value: 'value',
    },
    prepare(selection) {
      return {
        title: selection.displayLabel,
        subtitle: selection.value,
      };
    },
  },
});
