// app/[filename]/page.tsx
import { useRouter } from 'next/router';

export default function FilePage() {
  const router = useRouter();
  const { filename } = router.query;

  return (
    <div>
      <h1>Content for {filename}</h1>
      {/* Add logic to render specific content based on the filename */}
      <p>This is the content of the file: {filename}</p>
    </div>
  );
}
