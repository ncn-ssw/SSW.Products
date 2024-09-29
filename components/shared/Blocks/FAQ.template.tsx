import type { Template } from 'tinacms';

export const FAQTemplate: Template = {
  label: 'FAQ',
  name: 'faq',
  ui: {
    defaultItem: {
      headline: 'Frequently Asked Questions',
      text: '',
      questions: [{ question: '', answer: '' }],
    },
  },
  fields: [
    { name: 'headline', label: 'Headline', type: 'string' },
    {
      name: 'text',
      label: 'Text',
      type: 'string',
      ui: { component: 'textarea' },
    },
    {
      name: 'questions',
      label: 'Questions',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item: { question: string }) => ({
          label: item?.question || 'New Question',
        }),
      },
      fields: [
        { name: 'question', label: 'Question', type: 'string' },
        { name: 'answer', label: 'Answer', type: 'string' },
      ],
    },
  ],
};
