// app/[product]/[filename]/page.tsx
"use client"; // Add this directive to make the component a Client Component

import { usePathname } from 'next/navigation';

export default function FilePage() {
  const pathname = usePathname(); // Get the current path

  // Extract the filename from the path, ensuring it's not null
  const filename = pathname ? pathname.split('/')[2] : 'Unknown File';

  return (
    <div>
      <h1>Content for {filename}</h1>
      {/* Add logic to render specific content based on the filename */}
      <p>This is the content of the file: {filename}</p>
    </div>
  );
}
