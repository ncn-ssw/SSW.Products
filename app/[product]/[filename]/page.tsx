"use client"; 

import { usePathname } from 'next/navigation';

export default function FilePage() {
  const pathname = usePathname(); 

  let filename;

  if(process.env.NODE_ENV === 'development')
  {
    filename = pathname ? pathname.split('/')[1] : 'Unknown File';
    console.log('dev')
  }else
  {
    filename = pathname ? pathname.split('/')[2] : 'Unknown File';
    console.log('prod')
  }

  console.log('filename i found was')


  return (
    <div>
      <h1>Content for {filename}</h1>
  
      <p>This is the content of the file: {filename}</p>
    </div>
  );
}
