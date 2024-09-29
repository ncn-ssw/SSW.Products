import { Template } from "tinacms";
import { actionsButtonTemplate } from "./ActionsButton.template";
import { modalButtonTemplate } from "./ModalButton.template";

export const FeaturesTemplate: Template = {
  label: "Features",
  name: "features",
  fields: [
    {
      name: "featureItem",
      label: "Feature",
      type: "object",
      list: true,
      ui: {
        itemProps: (item: any) => {
          return {
            label: item?.headline,
          };
        },
      },
      fields: [
        { name: "headline", label: "Headline", type: "string" as const },
        {
          name: "text",
          label: "Text",
          type: "string" as const,
          ui: { component: "textarea" },
        },
        {
          name: "buttons",
          label: "Buttons",
          list: true,
          type: "object",
          templates: [
            actionsButtonTemplate,
            // modalButtonTemplate,
          ],
        },
        {
          name: "media",
          label: "Media",
          type: "object", // Make sure this is 'object'
          list: true, // Ensure `list: true` is present if multiple items are expected
          ui: {
            min: 0, // Set your minimum and maximum constraints
            max: 1,
          },
          templates: [
            {
              name: "image",
              label: "Image",
              fields: [{ name: "image", label: "Image", type: "image" }],
            },
            {
              name: "externalVideo",
              label: "External Video",
              fields: [{ name: "src", label: "src", type: "string" }],
            },
          ],
        },
        {
          name: "isReversed",
          label: "Is Text on the Right?",
          type: "boolean",
          ui: {
            component: "toggle",
            parse: (value: any) => !!value,
            format: (value: any) => !!value,
          },
          description:
            "When toggled, the media and text content will be reversed.",
        },
        {
            name: 'removeBottomPadding',
            label: 'Do we want to remove the bottom padding?',
            type: 'boolean',
            ui: {
                component: 'toggle',
                parse: (value: any) => !!value,
                format: (value: any) => !!value,
            }
        }
      ],
    },
  ],
};
