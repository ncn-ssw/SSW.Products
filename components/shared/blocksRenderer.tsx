import FeatureBlocks, { FeatureItem } from "./Blocks/Features";
import FAQ from "./Blocks/FAQ";
import FeatureHorizontalCarousel from "./Blocks/FeatureCarousel";


interface Block {
  __typename: string;
  title?: string | null;
  featureItem?: FeatureItem[];
  removeBottomPadding?: boolean;
}

interface BlocksProps {
  blocks: Block[] | null;
}

const Blocks = ({ blocks }: BlocksProps) => {
  if (!blocks) return null;

  return blocks.map((block: Block, index: number) => {
    console.log(block.__typename);
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
