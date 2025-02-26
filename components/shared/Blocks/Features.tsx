import React from "react";
import Actions from "./ActionsButton";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import {
  Components,
  TinaMarkdown,
  TinaMarkdownContent,
} from "tinacms/dist/rich-text";
import { YouTubeEmbed } from "../YouTubeEmbed";
import { ButtonSize, ButtonVariant } from "./buttonEnum";

type ActionButton = {
  label: string;
  url: string;
  variant: ButtonVariant;
  size: ButtonSize;
};

export type FeatureItem = {
  headline: string;
  text: TinaMarkdownContent;
  buttons: ActionButton[];
  media: Array<{
    __typename: string;
    image?: string;
    src?: string;
  }>;
  isReversed: boolean;
  hasBackground: boolean;
};

export const featureComponents: Components<Record<string, unknown>> = {
  //@ts-expect-error investigate type err
  p: (props: React.HTMLProps<HTMLParagraphElement>) => (
    <p
      className="mb-4 text-white  leading-relaxed lg:text-lg md:text-md"
      //@ts-expect-error investigate type err
      data-tina-field={tinaField(props, "text")}
      {...props}
    />
  ),
  //@ts-expect-error investigate type err
  span: (props: React.HTMLProps<HTMLSpanElement>) => (
    <span
      className="mb-4 text-white  leading-relaxed lg:text-lg md:text-md"
      //@ts-expect-error investigate type err
      data-tina-field={tinaField(props, "text")}
      {...props}
    />
  ),
};

const FeatureBlock = ({ feature }: { feature: FeatureItem }) => {
  const renderMedia = () => {
    if (feature.media && feature.media.length > 0) {
      const mediaItem = feature.media[0];

      if (
        mediaItem.__typename ===
          "PagesPageBlocksFeaturesFeatureItemMediaImage" &&
        mediaItem.image
      ) {
        return (
          <Image
            src={mediaItem.image}
            alt={feature.headline}
            className="w-full h-auto object-cover"
            data-tina-field={tinaField(mediaItem, "image")}
            width={1000}
            height={1000}
          />
        );
      }

      if (
        mediaItem.__typename ===
          "PagesPageBlocksFeaturesFeatureItemMediaExternalVideo" &&
        mediaItem.src
      ) {
        return (
          <div className="w-full h-full flex items-center justify-center">
            <YouTubeEmbed src={mediaItem.src} />
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div
      className={`flex flex-col-reverse lg:flex-row w-full items-center lg:gap-12 gap-8 ${
        feature.isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
      }  pb-10 lg:pb-0 px-8 3xl:px-20`}
    >
      <div className="lg:w-2/7 w-full flex flex-col gap-2">
        <h2
          className="xl:text-5xl lg:text-4xl md:text-4xl text-4xl text-white  tracking-wide"
          data-tina-field={tinaField(feature, "headline")}
        >
          {feature.headline}
        </h2>
        <div></div>
        <TinaMarkdown content={feature.text} components={featureComponents} />
        <div className="flex flex-col lg:flex-row lg:justify-start lg:items-center gap-4 xl:gap-0">
          {feature.buttons?.map((button, index) => (
            <Actions key={index} actions={[button]} />
          ))}
        </div>
      </div>
      <div
        className="lg:w-6/10 xl:w-7/10 w-full flex items-center justify-center h-full"
        data-tina-field={tinaField(feature, "media")}
      >
        {renderMedia()}
      </div>
    </div>
  );
};

type FeatureBlocksProps = {
  data: {
    featureItem: FeatureItem[];
  };
  index: number;
};

const FeatureBlocks = ({ data, index }: FeatureBlocksProps) => {
  const features =
    data && Array.isArray(data.featureItem) ? data.featureItem : [];

  const sizingClasses = "xl:px-32 3xl:px-60 lg:px-28 md:px-10 pt-32 pb-20";

  return (
    <section
      key={"features-" + index}
      className={`flex flex-col items-center lg:space-y-12 ${sizingClasses}`}
    >
      {features.length > 0 &&
        features.map((feature: FeatureItem, featureIndex: number) => (
          <FeatureBlock key={"feature-" + featureIndex} feature={feature} />
        ))}
    </section>
  );
};

export default FeatureBlocks;
