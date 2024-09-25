"use client";

import { useEffect, useState } from "react";
import { NavigationBarQuery } from "../../tina/__generated__/types";
import Image from "next/image";

interface NavBarClientProps {
  results: NavigationBarQuery | null;
}

export default function NavBarClient({ results }: NavBarClientProps) {
  const [scrolled] = useState(false);

  const { navigationBar } = results || {};
  const navItems = navigationBar?.navItem;
  const logo = navigationBar?.Logo;

  return (
    <nav
      className={`${
        scrolled ? "bg-[rgba(51,51,51,0.9)] backdrop-blur-sm" : "bg-transparent"
      } text-white sticky top-0 w-full transition-colors duration-300`}
    >
      <ul className="flex items-center space-x-4">
        {logo && (
          <li>
            <Image src={logo} alt="Logo" width={200} height={200} />
          </li>
        )}
        {navItems?.map((item, index) => {
          if (item?.__typename === "NavigationBarNavItemStringItem" && item.label && item.href) {
            return (
              <li key={index} className="flex items-center">
                <a href={item.href} className="hover:underline text-xl font-helvetica">
                  {item.label}
                </a>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </nav>
  );
}
