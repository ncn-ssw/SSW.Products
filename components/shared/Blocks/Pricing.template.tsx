import { Template } from "tinacms";
import { actionsButtonTemplate } from "./ActionsButton.template";
import { bookingButtonSchema } from "./BookingButtom.template";

export const pricingTemplate: Template = {
  label: "Pricing",
  name: "pricing",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string" as const,
    },
    {
      name: "description",
      label: "Description",
      type: "rich-text",
    },
    {
      name: "allPlans",
      label: "Items included in all plans",
      type: "object",
      list: true as const,
      ui: {
        itemProps: (item: any) => ({
          label: item?.title,
        }),
      },
      fields: [
        {
          name: "title",
          label: "Title",
          type: "string" as const,
        },
      ],
    },
    {
      name: "plans",
      label: "Plans",
      type: "object",
      list: true as const,
      ui: {
        itemProps: (item: any) => ({
          label: item?.planTier,
        }),
      },
      fields: [
        {
          name: "planTier",
          label: "Plan Tier",
          type: "string" as const,
        },
        {
          name: "planDescription",
          label: "priceDescription",
          type: "string" as const,
        },
        {
          name: "price",
          label: "price",
          type: "string" as const,
        },
        {
          name: "subPriceText",
          label: "Price under Text",
          type: "string" as const,
        },
        {
          name: "isReccomended",
          label: "Is this tier reccomended?",
          type: "boolean" as const,
        },
        {
          name: "actions",
          label: "Actions",
          type: "object",
          list: false,
          ui: {
            itemProps: (item: any) => ({
              label: item?.label,
            }),
          },
          fields: [
            ...actionsButtonTemplate.fields,
            ...bookingButtonSchema.fields,
          ],
        },
      ],
    },
  ],
};
