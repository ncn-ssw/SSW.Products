"use client"; // Ensure this is added if you are using the App Router

import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  const { site, filename } = router.query; 

  if (!site) {
    return <div>Error: Tenant not found</div>;
  }

  return (
    <div>
      <h1>Current Tenant: {site}</h1>
      <p>You are currently viewing the page for filename: {filename}</p>
    </div>
  );
}
