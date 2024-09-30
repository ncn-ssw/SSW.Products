import React from 'react';
import Actions from './ActionsButton';
import { tinaField } from 'tinacms/dist/react';
import Image from 'next/image';

type ActionButton = {
  label: string;
  url: string;
  variant: 'solidRed' | 'solidWhite' | 'outlinedWhite';
  size: 'small' | 'medium' | 'large';
};

export type FeatureItem = {
  headline: string;
  text: string;
  buttons: ActionButton[];
  media: Array<{
    __typename: string;
    image?: string;
    src?: string;
  }>;
  isReversed: boolean;
  hasBackground: boolean;
  removeBottomPadding?: boolean;
};

const FeatureBlock = ({ feature }: { feature: FeatureItem }) => {
  const renderMedia = () => {
    if (feature.media && feature.media.length > 0) {
      const mediaItem = feature.media[0];

      if (
        mediaItem.__typename ===
          'PagesPageBlocksFeaturesFeatureItemMediaImage' &&
        mediaItem.image
      ) {
        return (
          <Image
            src={mediaItem.image}
            alt={feature.headline}
            className="w-full h-auto object-cover"
            data-tina-field={tinaField(mediaItem, 'image')}
            width={1000}
            height={1000}
          />
        );
      }

      if (
        mediaItem.__typename ===
          'PagesPageBlocksFeaturesFeatureItemMediaExternalVideo' &&
        mediaItem.src
      ) {
        return (
          <div className="w-full h-full flex items-center justify-center">
            <iframe
              src={mediaItem.src}
              title={feature.headline}
              className="w-full xl:h-[500px] rounded-lg shadow-lg"
              allowFullScreen
              data-tina-field={tinaField(mediaItem, 'src')}
            />
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div
      className={`flex flex-col-reverse lg:flex-row w-full items-center gap-12 ${
        feature.isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
      } ${feature.removeBottomPadding ? '' : 'mb-60'} pb-10 lg:pb-0 px-4 xl:px-20`}  
    >
      {/* Left Column: Headline, Text, and Buttons */}
      <div className="lg:w-2/7 w-full flex flex-col gap-4">
        <h2
          className="lg:text-5xl md:text-5xl text-4xl text-white font-helvetica tracking-wide mb-4"
          data-tina-field={tinaField(feature, 'headline')}
        >
          {feature.headline}
        </h2>
        <p
          className="mb-4 text-white font-helvetica leading-relaxed lg:text-lg md:text-md"
          data-tina-field={tinaField(feature, 'text')}
        >
          {feature.text}
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col lg:flex-row lg:justify-start lg:items-center gap-4 xl:gap-0">
          {feature.buttons.map((button, index) => (
            <Actions key={index} actions={[button]} />
          ))}
        </div>
      </div>

      {/* Right Column: Media */}
      <div
        className="lg:w-6/10 xl:w-7/10 w-full flex items-center justify-center h-full"
        data-tina-field={tinaField(feature, 'media')}
      >
        {renderMedia()}
      </div>
    </div>
  );
};

type FeatureBlocksProps = {
  data: {
    featureItem: FeatureItem[];
    removeBottomPadding?: boolean;
  };
  index: number;
};

const FeatureBlocks = ({ data, index }: FeatureBlocksProps) => {
  const features = data && Array.isArray(data.featureItem) ? data.featureItem : [];

  return (
    <section
      key={'features-' + index}
      className={`flex flex-col items-center lg:space-y-12 ${
        data.removeBottomPadding ? '' : ''
      } px-4 xl:px-20`}
    >
      {features.length > 0 &&
        features.map((feature: FeatureItem, featureIndex: number) => (
          <FeatureBlock key={'feature-' + featureIndex} feature={feature} />
        ))}
    </section>
  );
};

export default FeatureBlocks;
