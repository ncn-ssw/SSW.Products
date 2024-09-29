/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useTina } from "tinacms/dist/react";
import { blocksRenderer as BlocksRenderer } from "./blocksRenderer";

interface HomePageClientProps {
  query: any;
  data: any;
  variables: any;
}

export default function HomePageClient({
  query,
  data,
  variables,
}: HomePageClientProps) {
  const tinaData = useTina({
    query,
    variables,
    data,
  });

  return (
    <div className="pt-40  mx-auto w-full max-w-xl lg:max-w-4xl xl:max-w-[120rem]">
      <BlocksRenderer
        data={{ pageBlocks: tinaData.data.pages.pageBlocks ?? null }}
      />
    </div>
  );
}
