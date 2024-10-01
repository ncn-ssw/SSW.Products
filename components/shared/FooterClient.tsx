'use client';

import { useEffect, useState } from 'react';
import { FooterQuery } from '../../tina/__generated__/types';
import {
  FaYoutube,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaGithub,
} from 'react-icons/fa';

interface FooterClientProps {
  results: FooterQuery | null;
}

// Mapping the icon names to the actual react-icons
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



  const footerItems = results?.footer?.footer;
  const footerTitle = results?.footer?.footerTitle;
  const footerColour = results?.footer?.footerColour || '#000000'; 

  return (
    <footer
      className={`text-white py-6 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ backgroundColor: footerColour }}
    >
      <div className="container mx-auto flex justify-between items-center">
        
        <div className="text-left text-sm lg:text-base">
          {footerTitle || 'Default Footer Title'}
        </div>

        
        <div className="flex space-x-4">
          {footerItems?.map((item, index) => {
            if (item) {
              return (
                <a
                  key={index}
                  href={item.footerItemLink ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-2xl"
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
