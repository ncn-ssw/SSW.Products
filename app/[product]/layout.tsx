import '../globals.css';
import NavBar from '../../components/YakShaver/NavBar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <NavBar />
      <body className="bg-gradient-to-br from-stone-800 via-stone-700 to-stone-600 min-h-screen">
        {children}
      </body>
    </html>
  );
}
