"use client"; 

import { useEffect, useState } from "react";
import { NavigationBarQuery } from "../../tina/__generated__/types";
import Image from "next/image";
import client from "../../tina/__generated__/client";

export default function NavBar() {
  const [results, setResults] = useState<NavigationBarQuery | null>(null);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.queries.navigationBar({
          relativePath: "YakShaver/YakShaver-NavigationBar.json",
        });
        setResults(data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  const { navigationBar } = results || {};
  const navItems = navigationBar?.navItem;
  const logo = navigationBar?.Logo;

  return (
    <nav
      className={`${
        scrolled ? "bg-green-600" : "bg-transparent"
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
