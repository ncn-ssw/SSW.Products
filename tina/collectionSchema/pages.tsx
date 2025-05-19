import { Collection, TinaField, wrapFieldsWithMeta } from "tinacms";
import { BannerTemplate } from "../../components/shared/Blocks/Banner.template";
import { FAQTemplate } from "../../components/shared/Blocks/FAQ.template";
import { CarouselFeatureTemplate } from "../../components/shared/Blocks/FeatureCarousel.template";
import { FeaturesTemplate } from "../../components/shared/Blocks/Features.template";
import { pricingTemplate } from "../../components/shared/Blocks/Pricing.template";
import { videoDisplayTemplate } from "../../components/shared/Blocks/VideoDisplay.template";

import React from "react";

import { bentoBoxTemplate } from "../../components/shared/Blocks/BentoBox/BentoBox.template";
import { HeroTemplate } from "../../components/shared/Blocks/Hero/Hero.template";
import { timelineTemplate } from "../../components/shared/Blocks/Timeline/Timeline.template";

import { CalculatorTemplate } from "../../components/shared/Blocks/Calculator.template";
import { callToActionTemplate } from "../../components/shared/Blocks/CallToAction.template";
import { CardAndImageTemplate } from "../../components/shared/Blocks/CardAndImage/CardAndImage.template";
import { ComparisonTable } from "../../components/shared/Blocks/ComparisonTable.template";
import TryItNowTemplate from "../../components/shared/Blocks/TryItNow.template";
import * as AntIcons from "../../node_modules/react-icons/ai";
import {
  accordionBlock,
  breadcrumbBlock,
  buttonBlock,
  cardCarouselBlock,
  imageTextBlock,
  logoCarouselBlock,
} from "../../node_modules/ssw-tinacms-landingkit/dist";
import { seoInformation } from "../shared/SEOInformation";

export const bottomPaddingOptions = {
  none: undefined,
  small: "pb-12",
  "extra large": "pb-40",
};

export const inputClasses: Record<string, string> = {
  gray: "bg-[#222222]",
  black: "bg-black",
};

const ColorPickerInput = wrapFieldsWithMeta(({ input }: any) => {
  return (
    <React.Fragment>
      <input type="text" id={input.name} className="hidden" {...input} />
      <div className="flex gap-2 flex-wrap">
        {Object.keys(inputClasses).map((color) => {
          return (
            <button
              key={color}
              className={`w-9 h-9 rounded-full shadow border ${
                inputClasses[color]
              } ${
                input.value === color
                  ? "ring-[3px] ring-offset-2 ring-blue-400"
                  : ""
              }`}
              onClick={() => {
                input.onChange(color);
              }}
            ></button>
          );
        })}
      </div>
    </React.Fragment>
  );
});

export const PagesSchema: Collection = {
  label: "Product Pages",
  name: "pages",
  path: "content/pages",
  format: "json",
  // This ui is needed because of the dynamic routing with [filename] -> tina is looking for a static path (i.e pages/TimePro, pages/YakShaver)
  ui: {
    router: ({ document }) => {
      return `/${document?._sys.filename}`;
    },
  },
  fields: [
    seoInformation as TinaField,
    {
      type: "string",
      name: "title",
      label: "Title",
    },

    {
      type: "object",
      name: "pageBlocks",
      label: "Page Blocks",
      list: true,
      ui: {
        visualSelector: true,
      },
      templates: [
        HeroTemplate,
        FeaturesTemplate,
        FAQTemplate,
        CarouselFeatureTemplate,
        pricingTemplate,
        BannerTemplate,
        videoDisplayTemplate,
        bentoBoxTemplate,
        timelineTemplate,
        callToActionTemplate,
        CardAndImageTemplate,
        ComparisonTable,
        CalculatorTemplate,
        TryItNowTemplate,
        breadcrumbBlock(
          "https://github.com/SSWConsulting/SSW.TinaCMS.LandingKit/blob/main/tina-starter/public/tina/previews/breadcrumbs.jpg?raw=true"
        ),
        logoCarouselBlock(
          "https://github.com/SSWConsulting/SSW.TinaCMS.LandingKit/blob/main/tina-starter/public/tina/previews/logo-carousel.png?raw=true?raw=true"
        ),
        buttonBlock({
          icons: AntIcons,
          previewSrc:
            "https://github.com/SSWConsulting/SSW.TinaCMS.LandingKit/blob/main/tina-starter/public/tina/previews/button.png?raw=true",
        }),
        cardCarouselBlock({
          icons: AntIcons,
          previewSrc:
            "https://github.com/SSWConsulting/SSW.TinaCMS.LandingKit/blob/main/tina-starter/public/tina/previews/card-carousel.jpg?raw=true",
        }),
        imageTextBlock({
          icons: AntIcons,
          previewSrc:
            "https://github.com/SSWConsulting/SSW.TinaCMS.LandingKit/blob/main/tina-starter/public/tina/previews/image-text-block.png?raw=true",
        }),
        accordionBlock({
          icons: AntIcons,
          previewSrc:
            "https://github.com/SSWConsulting/SSW.TinaCMS.LandingKit/blob/main/tina-starter/public/tina/previews/accordion.png?raw=true",
        }),
      ],
    },
    {
      type: "object",
      name: "pageFormatting",
      label: "Page Formatting",
      fields: [
        {
          type: "string",
          name: "backgroundColor",
          label: "Background Color",
          ui: {
            component: ColorPickerInput,
          },
        },
        {
          description:
            "Add padding to the bottom of the page before the footer",
          name: "bottomPadding",
          label: "Bottom Padding",
          type: "string",
          options: Object.keys(bottomPaddingOptions),
        },
      ],
    },
  ],
};
