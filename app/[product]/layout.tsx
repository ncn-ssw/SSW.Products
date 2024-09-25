import '../globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-green-500 !important">
        {children}
      </body>
    </html>
  );
}
