import React from 'react';
import Image from 'next/image';
import Actions from './ActionsButton';
import { tinaField } from 'tinacms/dist/react';

interface BannerProps {
  data: {
    backgroundColour: string;
    textColour: string;
    headline: string;
    text: string;
    buttons: Array<{
      label: string;
      url: string;
      variant: 'solidRed' | 'solidWhite' | 'outlinedWhite';
      size: 'small' | 'medium' | 'large';
    }>;
    image: string; 
  };
}

const Banner = ({ data }: { data: BannerProps['data'] }) => {
  console.log(data);
  const gradientBackground = `linear-gradient(135deg, ${data.backgroundColour}33, ${data.backgroundColour})`;

  return (
    <div
      className='w-full pt-8'
      style={{
        background: gradientBackground,
      }}
    >
      <div
        className='container mx-auto px-4 flex flex-col lg:flex-row items-center lg:gap-12 gap-8 text-left'
        style={{ color: data.textColour }}
      >
        
        <div className='lg:w-1/3 w-full flex font-helvetica flex-col gap-4 lg:pl-20'>
          <h1
            className='text-3xl  mb-4'
            data-tina-field={tinaField(data, 'headline')}
          >
            {data.headline}
          </h1>
          <p
            className='text-lg mb-6'
            data-tina-field={tinaField(data, 'text')}
          >
            {data.text}
          </p>

        
          <div className='flex flex-col lg:flex-row lg:justify-start lg:items-center gap-4 xl:gap-0 mb-8'>
            {data.buttons?.map((button, index) => (
              <Actions key={index} actions={[button]} />
            ))}
          </div>
        </div>

        
        {data.image && (
          <div
            className='lg:w-1/2 w-full flex items-center justify-center h-full'
            data-tina-field={tinaField(data, 'image')}
          >
            <Image
              src={data.image}
              alt={data.headline}
              className='w-full h-auto object-cover'
              width={1000}
              height={1000}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
