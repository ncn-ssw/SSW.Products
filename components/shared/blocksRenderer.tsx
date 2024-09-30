import FeatureBlocks from "./Blocks/Features";
import { FAQTemplate } from "./Blocks/FAQ.template";
import FAQ from "./Blocks/FAQ";
import FeatureHorizontalCarousel from "./Blocks/FeatureCarousel";


interface Block {
  __typename: string;
  title?: string | null;
  
}


interface BlocksProps {
  blocks: Block[] | null;
}

const Blocks = ({ blocks }: BlocksProps) => {
  if (!blocks) return null;
  return blocks.map((block: Block, index: number) => {
    console.log(block.__typename);
    switch (block.__typename) {
      case "PagesPageBlocksFeatures":
        return <FeatureBlocks key={index} data={block} index={index} />;
      case "PagesPageBlocksFaq":
        // @ts-ignore
        return <FAQ key={index} data={block} index={index} />;
      case "PagesPageBlocksFeatureCarousel":
        return (
          // @ts-ignore
          <FeatureHorizontalCarousel key={index} data={block} index={index} />
        );
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
