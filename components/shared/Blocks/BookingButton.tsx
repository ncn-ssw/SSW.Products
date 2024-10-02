import { useState, useEffect } from 'react';

interface BookingButtonProps {
  title: string;
}

export const BookingButton = ({ title }: BookingButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [iframeHeight, setIframeHeight] = useState('500px');

  const openModal = () => {
    setIsOpen(true);
    updateIframeHeight();
  };
  
  const closeModal = () => setIsOpen(false);

  const updateIframeHeight = () => {
    const windowHeight = window.innerHeight;
    const calculatedHeight = windowHeight * 0.8; 
    setIframeHeight(`${calculatedHeight}px`);
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('resize', updateIframeHeight);
      document.body.classList.add('overflow-hidden'); // Disable scrolling when modal is open
    } else {
      window.removeEventListener('resize', updateIframeHeight);
      document.body.classList.remove('overflow-hidden'); // Enable scrolling when modal is closed
    }

    return () => {
      window.removeEventListener('resize', updateIframeHeight);
      document.body.classList.remove('overflow-hidden'); // Clean up in case modal is closed
    };
  }, [isOpen]);
  
  const bookingId = process.env.NEXT_PUBLIC_JOTFORM_BOOKING_ID
  return (
    <div>
      <button
        onClick={openModal}
        className="md:px-5 md:py-4 px-2 py-1 bg-[#CC4141] md:font-semibold text-center items-center text-white rounded-lg hover:opacity-80 whitespace-nowrap"
      >
        {title}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{title}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                &#x2715;
              </button>
            </div>
            <iframe
              title="JotForm"
              src={`https://form.jotform.com/${bookingId}`}
              width="100%"
              height={iframeHeight}
              style={{ border: 'none' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
