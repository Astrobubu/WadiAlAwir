import { defineField, defineType } from 'sanity'

export const serviceSchema = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug (ID)',
      type: 'slug',
      description: 'Kebab-case identifier, e.g. window-tinting, ppf, ceramic-coating',
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
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon identifier: tint | shield | droplets | sparkles | wrench',
      options: {
        list: [
          { title: 'Tint (Water drop)', value: 'tint' },
          { title: 'Shield', value: 'shield' },
          { title: 'Droplets', value: 'droplets' },
          { title: 'Sparkles', value: 'sparkles' },
          { title: 'Wrench', value: 'wrench' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'packages',
      title: 'Packages',
      type: 'array',
      description: 'Optional pricing tiers / packages for this service',
      of: [
        {
          type: 'object',
          name: 'package',
          title: 'Package',
          fields: [
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
              name: 'price',
              title: 'Price (AED)',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: 'currency',
              title: 'Currency',
              type: 'string',
              initialValue: 'AED',
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
            }),
          ],
          preview: {
            select: {
              nameEn: 'name.en',
              nameAr: 'name.ar',
              price: 'price',
            },
            prepare({ nameEn, nameAr, price }) {
              return {
                title: nameEn || nameAr || 'Package',
                subtitle: price != null ? `${price} AED` : '',
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
      icon: 'icon',
    },
    prepare({ nameEn, nameAr, icon }) {
      return {
        title: nameEn || nameAr,
        subtitle: icon,
      }
    },
  },
})
