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
          <iframe
            src={mediaItem.src}
            title={feature.headline}
            className="w-full h-[500px] rounded-lg shadow-lg"
            allowFullScreen
            data-tina-field={tinaField(mediaItem, 'src')}
          />
        );
      }
    }
    return null;
  };

  return (
    <div
      className={`flex flex-col md:flex-row w-full items-center gap-8 ${
        feature.isReversed ? 'md:flex-row-reverse' : ''
      } ${feature.removeBottomPadding ? '' : 'mb-60'}`}
    >
      {/* Left Column: Headline, Text, and Buttons */}
      <div className="flex-1">
        <h2
          className="lg:text-6xl text-white font-helvetica tracking-wide mb-4"
          data-tina-field={tinaField(feature, 'headline')}
        >
          {feature.headline}
        </h2>
        <p
          className="mb-4 text-white font-helvetica leading-relaxed text-lg"
          data-tina-field={tinaField(feature, 'text')}
        >
          {feature.text}
        </p>
        <Actions actions={feature.buttons} />
      </div>

      {/* Right Column: Media */}
      <div className="flex-1 flex items-center justify-center" data-tina-field={tinaField(feature, 'media')}>
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
      className="flex flex-col items-center space-y-12 ${
        removeBottomPadding ? '' : 'mb-40'"
    >
      {features.length > 0 &&
        features.map((feature: FeatureItem, featureIndex: number) => (
          <FeatureBlock key={'feature-' + featureIndex} feature={feature} />
        ))}
    </section>
  );
};

export default FeatureBlocks;
