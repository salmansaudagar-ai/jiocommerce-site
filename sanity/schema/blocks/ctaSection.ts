import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: ['primary', 'secondary'],
      },
      initialValue: 'primary',
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      variant: 'variant',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: `CTA Section (${selection.variant})`,
      };
    },
  },
});
