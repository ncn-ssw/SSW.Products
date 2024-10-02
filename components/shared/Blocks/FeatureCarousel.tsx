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
  const [isSmallOrMediumScreen, setIsSmallOrMediumScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    setIsSmallOrMediumScreen(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsSmallOrMediumScreen(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (isUserInteracting || isSmallOrMediumScreen) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % (data?.carouselItems.length || 1));
    }, 7000);

    return () => clearInterval(interval);
  }, [isUserInteracting, isSmallOrMediumScreen, data?.carouselItems.length]);

  if (!data || !data.carouselItems || data.carouselItems.length === 0) {
    return <div>No data available</div>;
  }

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    setIsUserInteracting(true);
  };

  const renderMedia = (item: CarouselItem) => {
    const fileExtension = item.image.split('.').pop()?.toLowerCase();

    if (
      fileExtension === 'gif' ||
      fileExtension === 'jpg' ||
      fileExtension === 'jpeg' ||
      fileExtension === 'png'
    ) {
      return (
        <div className="flex justify-center items-center px-80" data-tina-field={tinaField(item, 'image')}>
          <Image
            src={item.image}
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
          data-tina-field={tinaField(item, 'image')}
        >
          <source src={item.image} type={`video/${fileExtension}`} />
          Your browser does not support the video tag.
        </video>
      );
    }
    return null;
  };

  return (
    <div className="feature-carousel text-center mb-40 px-4 md:px-0" data-tina-field={tinaField(data, 'carouselItems')}>
      
      {!isSmallOrMediumScreen ? (
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
      ) : (
        <div className="mb-10">
          <h2 className="text-2xl text-white">All Features</h2>
        </div>
      )}

      
      <div className="text-white tab-content mt-20">
        {!isSmallOrMediumScreen
          ? (
            <div>
              <h2 className="md:text-xl lg:text-3xl font-helvetica" data-tina-field={tinaField(data.carouselItems[activeIndex], 'title')}>
                {data.carouselItems[activeIndex]?.title || 'No title available'}
              </h2>
              <p className="text-base font-helvetica mt-10" data-tina-field={tinaField(data.carouselItems[activeIndex], 'description')}>
                {data.carouselItems[activeIndex]?.description || 'No description available'}
              </p>
              {renderMedia(data.carouselItems[activeIndex])}
            </div>
          ) : (
            data.carouselItems.map((item, index) => (
              <div key={index} className="mt-10">
                <h2 className="md:text-xl lg:text-3xl font-helvetica" data-tina-field={tinaField(item, 'title')}>
                  {item?.title || 'No title available'}
                </h2>
                <p className="text-base font-helvetica mt-4" data-tina-field={tinaField(item, 'description')}>
                  {item?.description || 'No description available'}
                </p>
                {item.image && renderMedia(item)}
              </div>
            ))
          )}
      </div>
    </div>
  );
};

export default FeatureHorizontalCarousel;
