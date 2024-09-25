// app/[product]/page.tsx
import client from "../../tina/__generated__/client";
import ProductPageClient from "../../components/YakShaver/HomePageClient";

interface ProductPageProps {
  params: { product: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = params.product;

  console.log("Found product:", product);
  console.log(`Querying TinaCMS for ${product}/home.json`);

  
  const productData = await getPage(product);

  console.log("Product data:", productData);

  return (
    <ProductPageClient
      query={productData.query}
      data={productData.data}
      variables={{ relativePath: `${product}/home.json` }}
    />
  );
}

async function getPage(product: string) {
  try {
    const res = await client.queries.pages({
      relativePath: `${product}/home.json`,
    });
    return {
      query: res.query,
      data: res.data,
    };
  } catch (error) {
    console.error("Error fetching TinaCMS data:", error);
    throw new Error(`Could not fetch data for ${product}/home.json`);
  }
}
