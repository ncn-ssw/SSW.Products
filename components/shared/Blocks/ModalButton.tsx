import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { BiArrowBack } from 'react-icons/bi';
import { tinaField } from 'tinacms/dist/react';

type ModalKey = 'mockModal1' | 'mockModal2' | 'mockModal3';

const modals: Record<ModalKey, React.ReactNode> = {
  mockModal1: <div>Mock Modal 1 Content</div>,
  mockModal2: <div>Mock Modal 2 Content</div>,
  mockModal3: <div>Mock Modal 3 Content</div>,
};

// Define types for the items
type ModalItem = {
  label: string;
  icon?: boolean;
  modal: ModalKey;
  variant: 'solidRed' | 'solidWhite' | 'outlinedWhite';
  size: 'small' | 'medium' | 'large';
};

type ModalBProps = {
  items: ModalItem[];
  align?: 'left' | 'center';
};

export const ModalB = ({ items, align = 'left' }: ModalBProps) => {
  const [open, setOpen] = useState(false);
  const [ModalContent, setModalContent] = useState<React.ReactNode>(null);

  const openModal = (modal: ModalKey) => {
    setModalContent(modals[modal]);
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  const isList = true;

  return (
    <>
      <div
        className={[
          'actionGroup',
          'items-center',
          isList ? 'flex flex-col sm:flex-row md:flex-row lg:flex-row' : 'flex flex-row',
          align === 'center' && 'justify-center',
          'space-x-4',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {items &&
          items.map((item: ModalItem) => {
            const { label, icon, modal, variant, size } = item;

            return (
              <button
                key={label}
                onClick={() => openModal(modal)}
                data-tina-field={tinaField(item, 'label')}
                className={`
                  ${variant} ${size} rounded transition duration-150 ease-in-out
                  hover:opacity-85 flex items-center justify-center
                `}
              >
                {label}
                {icon && <BiArrowBack className="h-[1.125em] w-auto opacity-70 ml-2 -mr-1 -mt-1 rotate-180" />}
              </button>
            );
          })}
      </div>

      <Modal open={open} onClose={closeModal} center>
        {ModalContent}
      </Modal>
    </>
  );
};
