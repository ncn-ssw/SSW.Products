"use client"; 

import { usePathname } from 'next/navigation';
import client from '../../../tina/__generated__/client';

export default function FilePage() {
  const pathname = usePathname(); 

  
  const filename = pathname ? pathname.split('/')[2] : 'Unknown File';

  return (
    <div>
      <h1>Content for {filename}</h1>
  
      <p>This is the content of the file: {filename}</p>
    </div>
  );
}
