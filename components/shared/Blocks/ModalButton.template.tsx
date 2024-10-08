import { genericButtonTemplateFields } from './genericButtonTemplateFields';

const modals = ['mockModal1', 'mockModal2', 'mockModal3'];

type ModalButtonItem = {
  label?: string;
};

export const modalButtonTemplate = {
  label: 'Modal Button',
  name: 'modalButton',
  type: 'object',
  list: true,
  ui: {
    itemProps: (item: ModalButtonItem) => ({
      label: item?.label,
    }),
  },
  fields: [
    ...genericButtonTemplateFields.fields,
    //If we remove 'as const' TypeScript will infer string[] (the broader type), defining as const aligns with stricter type safety
    { name: 'modal', label: 'Modal', type: 'string' as const, options: modals },
  ],
};
