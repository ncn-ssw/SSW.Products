import { HeroBlock } from "../ExampleHero";

// Define the expected shape of the block
interface Block {
  __typename: string;
  title?: string | null;
  // Add any other properties your block may have
}

// Define the props for the Blocks component
interface BlocksProps {
  blocks: Block[] | null;
}

const Blocks = ({ blocks }: BlocksProps) => {
  if (!blocks) return null;
  return blocks.map((block: Block, index: number) => {
    console.log(block.__typename);
    switch (block.__typename) {
      case 'PagesPageBlocksExampleHero':
        return <HeroBlock key={index} data={block} index={index} />;
      default:
        return null; // Handle other cases or return null for unmatched types
    }
  });
};

// Define the shape of the data prop for blocksRenderer
interface BlocksRendererProps {
  data: {
    pageBlocks: Block[] | null;
  };
}

export const blocksRenderer = ({ data }: BlocksRendererProps) => {
  return <Blocks blocks={data.pageBlocks} />;
};
