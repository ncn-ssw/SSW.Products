"use client";

import { useTina } from 'tinacms/dist/react';
import { blocksRenderer as BlocksRenderer } from "../../components/shared/Blocks/blocksRenderer";

interface ProductPageClientProps {
  query: any;
  data: any;
  variables: any;
}

export default function ProductPageClient({ query, data, variables }: ProductPageClientProps) {
  const tinaData = useTina({
    query,
    variables,
    data,
  });

  const pageData = tinaData.data.pages;

  return (
    <div className="pt-40 px-80">
      <BlocksRenderer data={{ pageBlocks: pageData.pageBlocks ?? null }} />
    </div>
  );
}
