export const genericButtonTemplateFields = {
    fields: [
      { name: 'label', label: 'Label', type: 'string' as const, required: true },
      {
        name: 'variant',
        label: 'Variant',
        type: 'string' as const,
        required: true,
        options: [
          { value: 'solidRed', label: 'Solid Red' },
          { value: 'solidWhite', label: 'Solid White' },
          { value: 'outlinedWhite', label: 'Outlined White' },
        ],
      },
      {
        name: 'size',
        label: 'Size',
        type: 'string' as const,
        required: true,
        options: [
          { value: 'small', label: 'Small' },
          { value: 'medium', label: 'Medium' },
          { value: 'large', label: 'Large' },
        ],
      },
      
    ],
  };