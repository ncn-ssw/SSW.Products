import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { tinaField } from 'tinacms/dist/react';

interface CarouselItem {
  tabTitle: string;
  title: string;
  description: string;
  image: string;
}

interface FeatureCarouselProps {
  data: {
    headline: string;
    carouselItems: CarouselItem[];
  } | null;
}

const FeatureHorizontalCarousel = ({ data }: FeatureCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  useEffect(() => {
    if (isUserInteracting) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % (data?.carouselItems.length || 1));
    }, 7000);

    return () => clearInterval(interval);
  }, [isUserInteracting, data?.carouselItems.length]);

  if (!data || !data.carouselItems || data.carouselItems.length === 0) {
    return <div>No data available</div>;
  }

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    setIsUserInteracting(true);
  };

  const activeItem = data.carouselItems[activeIndex];

  const renderMedia = (mediaUrl: string) => {
    const fileExtension = mediaUrl.split('.').pop()?.toLowerCase();

    if (
      fileExtension === 'gif' ||
      fileExtension === 'jpg' ||
      fileExtension === 'jpeg' ||
      fileExtension === 'png'
    ) {
      return (
        <div className="flex justify-center items-center px-80" data-tina-field={tinaField(activeItem, 'image')}>
          <Image
            src={mediaUrl}
            alt="Media item"
            className="w-full mt-10 rounded-xl shadow-lg"
            width={200}
            height={200}
          />
        </div>
      );
    } else if (fileExtension === 'mp4' || fileExtension === 'webm') {
      return (
        <video
          autoPlay
          muted
          loop
          className="w-full h-auto mt-6 rounded-xl shadow-lg px-80"
          data-tina-field={tinaField(activeItem, 'image')}
        >
          <source src={mediaUrl} type={`video/${fileExtension}`} />
          Your browser does not support the video tag.
        </video>
      );
    }
    return null;
  };

  return (
    <div className="feature-carousel text-center mb-40 px-4 md:px-0" data-tina-field={tinaField(data, 'carouselItems')}>
      <div className="flex justify-center mb-4">
        <div className="tab-titles flex justify-center rounded-lg bg-black max-w-fit">
          {data.carouselItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={`lg:px-8 md:px-2 px-1 py-3 shadow-xl font-helvetica md:text-lg text-md rounded-xl ${
                activeIndex === index
                  ? ' text-black bg-white'
                  : ' text-white bg-black hover:bg-zinc-700 '
              }`}
              data-tina-field={tinaField(item, 'tabTitle')}
            >
              <span className="px-2">{item?.tabTitle || 'Untitled'}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="text-white tab-content mt-20">
        <h2 className="md:text-xl lg:text-3xl font-helvetica" data-tina-field={tinaField(activeItem, 'title')}>
          {activeItem?.title || 'No title available'}
        </h2>
        <p className="text-base font-helvetica mt-10" data-tina-field={tinaField(activeItem, 'description')}>
          {activeItem?.description || 'No description available'}
        </p>
        {activeItem.image && renderMedia(activeItem.image)}
      </div>
    </div>
  );
};

export default FeatureHorizontalCarousel;
