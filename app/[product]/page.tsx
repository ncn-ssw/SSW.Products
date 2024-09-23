// app/[product]/page.tsx
"use client"; // Add this directive to make the component a Client Component

import { usePathname } from 'next/navigation';

export default function ProductPage() {
  const pathname = usePathname(); // Get the current path
  console.log(pathname);

  // Extract the product name from the path, ensuring it's not null
  const product = pathname ? pathname.split('/')[1] : 'Unknown Product';

  return (
    <div>
      <h1>Welcome to the {product} page</h1>
      <p>This is the content for the product: {product}</p>
    </div>
  );
}
