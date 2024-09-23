"use client"; // Ensure this directive is present for client components

import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  const { site } = router.query;

  return (
    <div>
      <h1>Tenant Site: {site}</h1>
      <p>This content is dynamically served for {site}.</p>
    </div>
  );
}
