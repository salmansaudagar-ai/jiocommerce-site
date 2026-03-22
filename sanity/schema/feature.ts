import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'feature',
  title: 'Feature',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name from react-icons (e.g., "FiZap", "FiTrendingUp")',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['platform', 'solution', 'integration', 'security', 'performance'],
      },
    }),
    defineField({
      name: 'pageRef',
      title: 'Related Page',
      type: 'reference',
      to: [{ type: 'page' }],
      description: 'Page this feature belongs to',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Order in which features appear',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.category,
      };
    },
  },
});
