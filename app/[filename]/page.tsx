"use client"; // Make sure to add this if you are using Next.js App Router

import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  const { site, filename } = router.query; // Retrieve site and filename from query params

  return (
    <div>
      <h1>Current Tenant: {site}</h1>
      <p>You are currently viewing the page for filename: {filename}</p>
    </div>
  );
}
