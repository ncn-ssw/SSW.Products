"use client"; // This ensures the file is treated as a client component

import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  const { site, filename } = router.query; // Access the dynamic params

  if (!site) {
    return <div>Error: Tenant not found</div>;
  }

  return (
    <div>
      <h1>Current Tenant: {site}</h1>
      <p>This content is dynamically served for {site}.</p>
    </div>
  );
}
