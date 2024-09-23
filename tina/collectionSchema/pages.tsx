import { Collection } from "tinacms";
import { ExampleHeroTemplate } from "../../components/shared/ExampleHero.template";

export const PagesSchema: Collection = {
  label: "Product Pages",
  name: "pages",
  path: "content/pages/",
  format: "json",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: 'object',
      name: 'pageBlocks',
      label: 'Page Blocks',
      list: true,
      ui: {
        visualSelector: true,
      },
      templates: [
        ExampleHeroTemplate
      ]
    }
    // Add more fields here as needed
  ],
};
