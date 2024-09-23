"use client"; // Ensure this is added if you are using the App Router

import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  const { site } = router.query; // Removed `filename` from the destructuring

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
