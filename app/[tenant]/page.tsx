"use client";

import { usePathname } from 'next/navigation';

export default function TenantHomePage() {
  const pathname = usePathname();
  console.log("pathname: ", pathname);  
  const tenant = pathname?.split('/')[1]; 

  return (
    <div>
      <h1>Welcome to the {tenant} homepage!</h1>
      <p>This is content specifically for {tenant}.</p>
    </div>
  );
}
