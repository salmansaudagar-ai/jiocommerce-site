import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'navItem',
  title: 'Navigation Item',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'Short description for dropdowns',
    }),
    defineField({
      name: 'href',
      title: 'Href',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'URL or path for this navigation item',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name from react-icons (e.g., "FiArrowRight")',
    }),
    defineField({
      name: 'group',
      title: 'Group',
      type: 'string',
      options: {
        list: ['main', 'platform', 'solutions', 'resources', 'company'],
      },
      description: 'Navigation group/section',
    }),
    defineField({
      name: 'parentRef',
      title: 'Parent Item',
      type: 'reference',
      to: [{ type: 'navItem' }],
      description: 'Parent navigation item for nested menus',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Order within group',
    }),
  ],
  preview: {
    select: {
      title: 'label',
      group: 'group',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.group || 'main',
      };
    },
  },
});
