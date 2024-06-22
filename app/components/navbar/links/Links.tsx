import { links } from "@/app/lib/LinksData";
import Link from "next/link";
import React, { useContext } from "react";
import { ThemeContext } from "@/app/lib/ThemeContext"; // Import the ThemeContext

interface LinksProps {
  ClassName?: string;
} 
const Links: React.FC<LinksProps> = ({ ClassName }) => {
  const { theme } = useContext(ThemeContext); // Use the ThemeContext

  return (
    <div className={`${theme === "dark" ? 'text-white' : 'text-[#434343]' } ${ClassName} my-auto uppercase nav-links   text-[14px] font-[700] overflow-x-auto relative`}>
      <ul className="flex gap-4 my-auto">
        {links.map((link, index) => (
          <Link key={index} href={link.pathname} className="w-auto link py-2">
            <li className="w-auto whitespace-nowrap overflow-hidden">{link.title}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Links;
