import FeatureBlocks, { FeatureItem } from './Blocks/Features';
import FAQ from './Blocks/FAQ';
import FeatureHorizontalCarousel from './Blocks/FeatureCarousel';
import Pricing from './Blocks/Pricing';

interface Block {
  __typename: string;
  title?: string | null;
  description?: string | null;
  allPlans?: { title: string | null }[] | null;
  plans?: {
    planTier: string | null;
    planDescription: string | null;
    price: string | null;
    subPriceText: string | null;
    actions: {
      label: string | null;
      url: string | null;
      variant?: string | null;
      size?: string | null;
    } | null;
  }[] | null;
  featureItem?: FeatureItem[];
  removeBottomPadding?: boolean;
}

interface BlocksProps {
  blocks: Block[] | null;
}

const Blocks = ({ blocks }: BlocksProps) => {
  if (!blocks) return null;

  return blocks.map((block: Block, index: number) => {
    
    switch (block.__typename) {
      case 'PagesPageBlocksFeatures':
        if (block.featureItem) {
          return (
            <FeatureBlocks
              key={index}
              data={{
                featureItem: block.featureItem,
                removeBottomPadding: block.removeBottomPadding,
              }}
              index={index}
            />
          );
        }
        return null;
      case 'PagesPageBlocksFaq':
        // @ts-expect-error investigate after
        return <FAQ key={index} data={block} index={index} />;
      case 'PagesPageBlocksFeatureCarousel':
        // @ts-expect-error investigate after
        return <FeatureHorizontalCarousel key={index} data={block} index={index} />;
      case 'PagesPageBlocksPricing':
        // @ts-expect-error investigate after
        return <Pricing key={index} data={block} />;
      default:
        return null;
    }
  });
};

interface BlocksRendererProps {
  data: {
    pageBlocks: Block[] | null;
  };
}

export const blocksRenderer = ({ data }: BlocksRendererProps) => {
  return <Blocks blocks={data.pageBlocks} />;
};
