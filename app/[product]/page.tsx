interface ProductPageProps {
  params: { product: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { product } = params;

  return (
    <div>
      <h1>Product: {product}</h1>
      <p>This is the content for the product: {product}</p>
    </div>
  );
}
