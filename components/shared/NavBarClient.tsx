'use client';

import { useEffect, useState } from 'react';
import { NavigationBarQuery } from '../../tina/__generated__/types';
import Image from 'next/image';

interface NavBarClientProps {
  results: NavigationBarQuery | null;
}

export default function NavBarClient({ results }: NavBarClientProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { navigationBar } = results || {};
  const navItems = navigationBar?.leftNavItem;
  const logo = navigationBar?.Logo;

  const navbarHeight = 120;

  return (
    <>
      <nav
        className={`${
          scrolled ? 'bg-[rgba(51,51,51,0.9)] backdrop-blur-md' : 'bg-transparent'
        } text-white fixed top-0 left-0 w-full z-50 transition-colors duration-300`}
        style={{ height: `${navbarHeight}px` }}
      >
        <ul className="pl-20 flex items-center justify-start h-full space-x-20">
          {logo && (
            <li className="flex items-center">
              <Image src={logo} alt="Logo" width={200} height={200} />
            </li>
          )}
          {navItems?.map((item, index) => {
            if (
              item?.__typename === 'NavigationBarLeftNavItemStringItem' &&
              item.label &&
              item.href
            ) {
              return (
                <li key={index} className="flex items-center">
                  <a href={item.href} className="hover:underline text-2xl font-helvetica">
                    {item.label}
                  </a>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </nav>

      <div style={{ marginTop: `${navbarHeight}px` }}></div>
    </>
  );
}
