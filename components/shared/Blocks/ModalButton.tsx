import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { BiArrowBack } from 'react-icons/bi';
import { tinaField } from 'tinacms/dist/react';


const modals = {
  'mockModal1': <div>Mock Modal 1 Content</div>,
  'mockModal2': <div>Mock Modal 2 Content</div>,
  'mockModal3': <div>Mock Modal 3 Content</div>,
};

export const ModalB = ({ items, align = 'left' }) => {
  const [open, setOpen] = useState(false);
  const [ModalContent, setModalContent] = useState<React.ReactNode>(null);

  const openModal = (modal) => {
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
          items.map((item) => {
            const { color, label, icon, modal, variant, size } = item;

            return (
              <button
                key={label}
                
                onClick={() => openModal(modal)}
                data-tina-field={tinaField(item, 'label')}
                className={`
                  ${variant === 'solidRed' && 'bg-red-600 text-white'}
                  ${variant === 'solidWhite' && 'bg-white text-black'}
                  ${variant === 'outlinedWhite' && 'border border-white text-white'}
                  ${size === 'small' && 'px-3 py-1 text-sm'}
                  ${size === 'medium' && 'px-4 py-2 text-base'}
                  ${size === 'large' && 'px-6 py-3 text-lg'}
                  rounded transition duration-150 ease-in-out
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
