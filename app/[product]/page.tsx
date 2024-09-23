import { usePathname, useSearchParams } from 'next/navigation';

export default function ProductPage() {
  const pathname = usePathname(); // Get the current path

  // Ensure pathname is not null
  const product = pathname ? pathname.split('/')[1] : 'Unknown Product';

  return (
    <div>
      <h1>Welcome to the {product} page</h1>
      <p>This is the content for the product: {product}</p>
    </div>
  );
}
