import { Template } from 'tinacms';
import { actionsButtonTemplate } from './ActionsButton.template';
import { modalButtonTemplate } from './ModalButton.template';

interface FeatureItem {
  headline?: string;
  text?: string;
  buttons?: Array<{ label: string; url: string }>;
  media?: Array<{ image?: string; src?: string }>;
  isReversed?: boolean;
  removeBottomPadding?: boolean;
}

export const FeaturesTemplate: Template = {
  label: 'Features',
  name: 'features',
  fields: [
    {
      name: 'featureItem',
      label: 'Feature',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item: FeatureItem) => {
          return {
            label: item?.headline,
          };
        },
      },
      fields: [
        { name: 'headline', label: 'Headline', type: 'string' as const },
        {
          name: 'text',
          label: 'Text',
          type: 'string' as const,
          ui: { component: 'textarea' },
        },
        {
          name: 'buttons',
          label: 'Buttons',
          list: true,
          type: 'object',
          templates: [actionsButtonTemplate, modalButtonTemplate],
        },
        {
          name: 'media',
          label: 'Media',
          type: 'object',
          list: true,
          ui: {
            min: 0,
            max: 1,
          },
          templates: [
            {
              name: 'image',
              label: 'Image',
              fields: [{ name: 'image', label: 'Image', type: 'image' }],
            },
            {
              name: 'externalVideo',
              label: 'External Video',
              fields: [{ name: 'src', label: 'src', type: 'string' }],
            },
          ],
        },
        {
          name: 'isReversed',
          label: 'Is Text on the Right?',
          type: 'boolean',
          ui: {
            component: 'toggle',
            parse: (value: unknown) => !!value,
            format: (value: unknown) => !!value,
          },
          description: 'When toggled, the media and text content will be reversed.',
        },
        {
          name: 'removeBottomPadding',
          label: 'Do we want to remove the bottom padding?',
          type: 'boolean',
          ui: {
            component: 'toggle',
            parse: (value: unknown) => !!value,
            format: (value: unknown) => !!value,
          },
        },
      ],
    },
  ],
};
