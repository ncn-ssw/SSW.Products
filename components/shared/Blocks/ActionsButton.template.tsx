import { genericButtonTemplateFields } from "./genericButtonTemplateFields";

  export const actionsButtonTemplate = {
    label: 'Actions Button',
    name: 'actions',
    type: 'object',
    list: true,
    ui: {
      itemProps: (item: any) => ({
        label: item?.label,
      }),
    },
    fields: [
      ...genericButtonTemplateFields.fields,
      { name: 'url', label: 'URL', type: 'string' as const },
    ],
  };
  