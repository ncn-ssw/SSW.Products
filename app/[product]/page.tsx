import client from '../../tina/__generated__/client'; // Adjust the path to your generated TinaCMS client

interface ProductPageProps {
  params: { product: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = params.product;

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
    console.error("Error fetching TinaCMS data:", error);
    return (
      <div>
        <h1>Product: {product}</h1>
        <p>Error fetching data.</p>
      </div>
    );
  }
}
