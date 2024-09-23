import client from '../../tina/__generated__/client'; // Adjust the path to your generated TinaCMS client

interface ProductPageProps {
  params: { product: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = params.product;

  console.log('Found product: ', product)

  console.log(`Querying TinaCMS for ${product}/home.json`)

  try {
    
    const pageContent = await client.queries.pages({
      relativePath: `${product}/home.json`,
    });

  
    
    const productData = pageContent?.data?.pages || {};

    return (
      <div>
        <h1>Product: {product}</h1>
        <pre>{JSON.stringify(productData, null, 2)}</pre>
      </div>
    );
  } catch (error) {
    const errorMsg = error
    console.error("Error fetching TinaCMS data:", error);
    return (
      <div>
        <h1>Product: {product}</h1>
        <p>{(error as Error).message}</p>
        <p>Error fetching data.</p>
      </div>
    );
  }
}
