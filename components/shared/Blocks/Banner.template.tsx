import { Template } from "tinacms";
import { actionsButtonTemplate } from "./ActionsButton.template";

export const BannerTemplate: Template = {
  name: "Banner",
  label: "Banner",
  fields: [
    {
      name: "backgroundColour",
      label: "Background Colour",
      type: "string",
      ui: {
        component: "color",
      },
    },
    {
      name: "textColour",
      label: "Text Colour",
      type: "string",
      ui: {
        component: "color",
      },
    },
    {
      name: "headline",
      label: "Headline",
      type: "string",
    },
    {
      name: "text",
      label: "Text",
      type: "string",
    },
    {
      name: "buttons",
      label: "Buttons",
      list: true,
      type: "object",
      templates: [actionsButtonTemplate],
    },
    {
      name: "image",
      label: "Image",
      type: "image",
    },
  ],
};
