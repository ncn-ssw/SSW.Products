// app/[product]/page.tsx
"use client"; // This makes it a Client Component

import { useEffect, useState } from 'react';

export default function ProductPage() {
  const [product, setProduct] = useState(''); // State to store the product name

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname; // Get the current hostname
      // Extract the subdomain (the part before the first dot)
      const productFromDomain = hostname.split('.')[0];
      setProduct(productFromDomain);
    }
  }, []);

  console.log(product);

  return (
    <div>
      <h1>Product: {product}</h1>
      <p>This is the content for the product: {product}</p>
    </div>
  );
}
