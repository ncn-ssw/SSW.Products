import { genericButtonTemplateFields } from "./genericButtonTemplateFields";

//TODO: Create modals 
const modals = [ 'mockModal1', 'mockModal2', 'mockModal3']

  export const modalButtonTemplate = {
    label: 'Modal Button',
    name: 'modalButton',
    type: 'object',
    list: true,
    ui: {
      itemProps: (item: any) => ({
        label: item?.label,
      }),
    },
    fields: [
      ...genericButtonTemplateFields.fields,
      { name: 'modal', label: 'Modal', type: 'string' as const, options: modals },
    ],
  };
  