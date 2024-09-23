// app/[product]/page.tsx
import { useRouter } from 'next/router';

export default function ProductPage() {
  const router = useRouter();
  const { product } = router.query;

  return (
    <div>
      <h1>Welcome to the {product} page</h1>
      {/* You can add additional product-specific logic or components here */}
      <p>This is the content for the product: {product}</p>
    </div>
  );
}
