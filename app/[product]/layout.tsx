import '../globals.css';
import NavBar from '../../components/YakShaver/NavBar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <NavBar />
      <body className="bg-gradient-to-br from-zinc-900 via-800-700 to-zinc-600 min-h-screen">
        {children}
      </body>
    </html>
  );
}
