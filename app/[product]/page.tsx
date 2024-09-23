import client from '../../tina/__generated__/client'; 

interface ProductPageProps {
  params: { product: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = params.product;
  
  console.log('Found product:', product);
  console.log(`Querying TinaCMS for ${product}/home.json`);

  const productData = await getPage(product);

  return (
    <div>
      <h1>Product: {product}</h1>
      <pre>{JSON.stringify(productData, null, 2)}</pre>
    </div>
  );
}


async function getPage(product: string) {
  try {
    const pageContent = await client.queries.pages({
      relativePath: `${product}/home.json`,
    });

    return pageContent?.data?.pages || {};
  } catch (error) {
    console.error("Error fetching TinaCMS data:", error);
    throw new Error(`Could not fetch data for ${product}/home.json`);
  }
}
