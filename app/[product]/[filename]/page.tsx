// app/[filename]/page.tsx
import { usePathname } from 'next/navigation';

export default function FilePage() {
  const pathname = usePathname(); // Get the current path

  // Extract the filename from the path, ensuring it's not null
  const filename = pathname ? pathname.split('/')[1] : 'Unknown File';

  return (
    <div>
      <h1>Content for {filename}</h1>
      {/* Add logic to render specific content based on the filename */}
      <p>This is the content of the file: {filename}</p>
    </div>
  );
}
