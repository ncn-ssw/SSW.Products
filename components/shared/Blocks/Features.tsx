import React from 'react';
import Actions from './ActionsButton';
import { tinaField } from 'tinacms/dist/react';

type ActionButton = {
  label: string;
  url: string;
  variant: 'solidRed' | 'solidWhite' | 'outlinedWhite';
  size: 'small' | 'medium' | 'large';
};

type FeatureItem = {
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
          <img
            src={mediaItem.image}
            alt={feature.headline}
            className="w-full h-auto object-cover"
            data-tina-field={tinaField(mediaItem, 'image')}
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
              className="w-full h-full rounded-lg shadow-lg"
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
      className={`flex flex-col-reverse lg:flex-row w-full items-center gap-8 ${
        feature.isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
      } ${feature.removeBottomPadding ? '' : 'mb-60'} pb-10 lg:pb-0 px-4 xl:px-20`}  
    >
      {/* Left Column: Headline, Text, and Buttons */}
      <div className="flex-1 flex flex-col gap-4">
        <h2
          className="lg:text-6xl md:text-5xl text-4xl text-white font-helvetica tracking-wide mb-4"
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
        <div className="flex flex-col lg:flex-row lg:justify-start lg:items-center gap-4">
          {feature.buttons.map((button, index) => (
            <Actions key={index} actions={[button]} />
          ))}
        </div>
      </div>

      {/* Right Column: Media */}
      <div
        className="flex-1 flex items-center justify-center w-full h-full"
        data-tina-field={tinaField(feature, 'media')}
      >
        {renderMedia()}
      </div>
    </div>
  );
};

type FeatureBlocksProps = {
  data: any;
  index: number;
};

const FeatureBlocks = ({ data, index }: FeatureBlocksProps) => {
  const features = data && Array.isArray(data.featureItem) ? data.featureItem : [];

  return (
    <section
      key={'features-' + index}
      className={`flex flex-col items-center lg:space-y-12 ${data.removeBottomPadding ? '' : ''} px-4 xl:px-20`}
    >
      {features.length > 0 &&
        features.map((feature: FeatureItem, featureIndex: number) => (
          <FeatureBlock key={'feature-' + featureIndex} feature={feature} />
        ))}
    </section>
  );
};

export default FeatureBlocks;
