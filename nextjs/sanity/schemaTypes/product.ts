import { defineField, defineType } from 'sanity'

export const productSchema = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug (ID)',
      type: 'slug',
      description: 'Kebab-case identifier, e.g. mud-guard, ambient-lighting',
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
      name: 'carModel',
      title: 'Car Model',
      type: 'reference',
      to: [{ type: 'carModel' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'carYear',
      title: 'Car Year',
      type: 'string',
      description: 'e.g. 2023-2024',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'AED',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Exterior', value: 'exterior' },
          { title: 'Interior', value: 'interior' },
          { title: 'Lighting', value: 'lighting' },
          { title: 'Utility', value: 'utility' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        defineField({
          name: 'en',
          title: 'English',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'ar',
          title: 'Arabic',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'object',
      fields: [
        defineField({
          name: 'en',
          title: 'English Features',
          type: 'array',
          of: [{ type: 'string' }],
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: 'ar',
          title: 'Arabic Features',
          type: 'array',
          of: [{ type: 'string' }],
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
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
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      options: {
        list: [
          { title: 'Warranty', value: 'warranty' },
          { title: 'None', value: '' },
        ],
        layout: 'radio',
      },
      description: 'Optional badge displayed on product card',
    }),
    defineField({
      name: 'warranty',
      title: 'Warranty',
      type: 'string',
      description: 'e.g. "1 year" — only fill if badge is warranty',
    }),
    defineField({
      name: 'variants',
      title: 'Variants',
      type: 'array',
      description: 'Optional color/style variants (e.g. White, Black, Orange)',
      of: [
        {
          type: 'object',
          name: 'variant',
          title: 'Variant',
          fields: [
            defineField({
              name: 'variantId',
              title: 'Variant ID',
              type: 'string',
              description: 'Kebab-case slug, e.g. white, black, orange',
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
            }),
            defineField({
              name: 'color',
              title: 'Color (hex)',
              type: 'string',
              description: 'CSS hex color for swatch, e.g. #E8E8E8',
            }),
            defineField({
              name: 'imageIndex',
              title: 'Image Index',
              type: 'number',
              description: 'Index into the images array for this variant (0-based)',
            }),
          ],
          preview: {
            select: {
              nameEn: 'name.en',
              nameAr: 'name.ar',
              color: 'color',
            },
            prepare({ nameEn, nameAr, color }) {
              return {
                title: nameEn || nameAr || 'Variant',
                subtitle: color,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      nameEn: 'name.en',
      nameAr: 'name.ar',
      media: 'thumbnail',
      category: 'category',
      price: 'price',
    },
    prepare({ nameEn, nameAr, media, category, price }) {
      return {
        title: nameEn || nameAr,
        subtitle: `${category} · ${price} AED`,
        media,
      }
    },
  },
})
