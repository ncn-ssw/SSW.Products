import { Template } from "tinacms";

export const CarouselFeatureTemplate: Template = {
  label: 'Feature Horizontal Carousel',
  name: 'featureCarousel',
  fields: [
    { name: 'headline', label: 'Headline', type: 'string' },
    {
      name: 'carouselItems',
      label: 'Feature Carousel',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item: { tabTitle: any }) => {
          return {
            label: item?.tabTitle || 'Feature Carousel Item',
          };
        },
      },
      fields: 
      [
        {name: 'tabTitle', label: 'Tab Title', type: 'string'},
        {name: 'title', label: 'Title', type: 'string'},
        {name: 'description', label: 'Description', type: 'string', ui: { component: 'textarea' }},
        {name: 'image', label: 'Image', type: 'image'},
      ],
    },
  ],
};
