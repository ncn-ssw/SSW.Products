import path from 'path';
import fs from 'fs/promises';
import client from '../../tina/__generated__/client';

interface ProductPageProps {
  params: { product: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = params.product;

  
  const pageContent = await client.queries.pages({
    relativePath: `${product}/home.json`,
  });

  
  const productData = pageContent?.data?.pages || {};

  console.log(productData.title)

  
  return (
    <div>
      <h1>Product: {product}</h1>
      <pre>{JSON.stringify(productData, null, 2)}</pre>
    </div>
  );
}

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'content');
  const productDirectories = await fs.readdir(contentDir);
  return productDirectories.map((product) => ({ product }));
}
