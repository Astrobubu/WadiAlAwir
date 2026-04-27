import { defineField, defineType } from 'sanity'

export const carModelSchema = defineType({
  name: 'carModel',
  title: 'Car Model',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug (ID)',
      type: 'slug',
      description: 'Kebab-case identifier, e.g. jetour-t2, jetour-rox-01',
      options: {
        source: 'name.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'object',
      fields: [
        defineField({
          name: 'en',
          title: 'English',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'ar',
          title: 'Arabic',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'years',
      title: 'Year Range',
      type: 'string',
      description: 'e.g. 2023-2024',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productCount',
      title: 'Product Count',
      type: 'number',
      description: 'Approximate number of products for this model (displayed in UI)',
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
  ],
  preview: {
    select: {
      nameEn: 'name.en',
      nameAr: 'name.ar',
      media: 'heroImage',
      years: 'years',
      productCount: 'productCount',
    },
    prepare({ nameEn, nameAr, media, years, productCount }) {
      return {
        title: nameEn || nameAr,
        subtitle: `${years} · ${productCount} products`,
        media,
      }
    },
  },
})
