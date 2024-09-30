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
    { name: 'modal', label: 'Modal', type: 'string' as const, options: modals },
  ],
};
