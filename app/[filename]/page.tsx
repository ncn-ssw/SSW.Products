"use client"; // Ensure this is at the very top

import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();

  if (!router.isReady) {
    return <div>Loading...</div>;
  }

  const { site, filename } = router.query;

  if (!site) {
    return <div>Error: Tenant not found</div>;
  }

  return (
    <div>
      <h1>Current Tenant: {site}</h1>
      <p>This content is dynamically served for tenant: {site}</p>
      {filename && <p>Requested page: {filename}</p>}
    </div>
  );
}
