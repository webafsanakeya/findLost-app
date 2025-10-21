import React, { useContext } from "react";

import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { ThemeContext } from "../../Contexts/ThemeContext/ThemeContext";


const Footer = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <footer
      className={`w-full px-6 py-10 mt-10 ${
        darkMode ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-3">FindLost</h3>
          <p className="text-sm">
            Helping people reunite with their lost belongings. Post lost and found items and connect with others quickly.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-purple-500 transition">Home</a></li>
            <li><a href="/allItems" className="hover:text-purple-500 transition">All Items</a></li>
            <li><a href="/faq" className="hover:text-purple-500 transition">FAQ</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-bold mb-3">Follow Us</h3>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-purple-500 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-purple-500 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-purple-500 transition"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} FindLost. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
