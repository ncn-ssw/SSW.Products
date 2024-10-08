"use client";

import { useEffect, useState } from "react";
import { FooterQuery } from "../../tina/__generated__/types";
import {
  FaYoutube,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaGithub,
} from "react-icons/fa";

interface FooterClientProps {
  results: FooterQuery | null;
}

const iconMap: { [key: string]: JSX.Element } = {
  FaYouTube: <FaYoutube />,
  FaLinkedIn: <FaLinkedin />,
  FaFacebook: <FaFacebook />,
  FaTwitter: <FaTwitter />,
  FaInstagram: <FaInstagram />,
  FaTiktok: <FaTiktok />,
  FaGithub: <FaGithub />,
};

export default function FooterClient({ results }: FooterClientProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!results?.footer) {
    return <p> Tina connection broken</p>;
  }

  const footerItems = results?.footer?.footer;
  const footerTitle = results?.footer?.footerTitle;
  //We are asserting that the footerColor exists with '!' as we are accounting for the null case in the className
  //and the non-null null case in the style 
  const footerColor = results.footer.footerColor!;

  return (
    <footer
      className={`text-white py-6 transition-opacity duration-300 ${
        !footerColor ?? "bg-SSW_charcoal"
      } ${isVisible ? "opacity-100" : "opacity-0"}`}
      style={{ backgroundColor: footerColor }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="pl-6 md:pl-0 text-left md:text-sm text-xs lg:text-base">
          {footerTitle || "Default Footer Title"}
        </div>

        <div className="flex space-x-4 md:pr-0 pr-6">
          {footerItems?.map((item, index) => {
            if (item) {
              return (
                <a
                  key={index}
                  href={item.footerItemLink ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 md:text-2xl text-lg"
                >
                  {item.footerItemIcon && iconMap[item.footerItemIcon]}
                </a>
              );
            }
            return null;
          })}
        </div>
      </div>
    </footer>
  );
}
