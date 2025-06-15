import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white py-10 mt-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold mb-3">🔍 Find & Lost</h2>
          <p className="text-sm leading-relaxed text-gray-300">
            Helping people reconnect with their lost items. Your trust, our priority.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/myItems'>My Items</NavLink></li>
            <li><NavLink to='/addItems'>Report Item</NavLink></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline"><NavLink to='/faq'>FAQ</NavLink></li>
            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:underline">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Social & Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Stay Connected</h3>
          <div className="flex space-x-4 text-xl mb-4">
            <a href="#"><FaFacebook className="hover:text-blue-400" /></a>
            <a href="#"><FaInstagram className="hover:text-pink-400" /></a>
            <a href="#"><FaTwitter className="hover:text-sky-400" /></a>
            <a href="#"><FaGithub className="hover:text-gray-400" /></a>
          </div>
          <form>
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-2 rounded text-black mb-2"
            />
            <button className="w-full bg-white text-purple-700 font-semibold py-2 rounded hover:bg-purple-200 transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="text-center mt-10 text-sm text-gray-400 border-t border-gray-600 pt-4">
        &copy; {new Date().getFullYear()} Find & Lost. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
