import React from "react";
import footerLogo from "../assets/footer-logo.png";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaX, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4">
      {/* Top Section  */}
      <div className=" container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left Side Logo and Nav  */}
        <div className="md:w-1/2 w-full">
          <img src={footerLogo} className="mb-5 w-36" alt="" />
          <ul className="flex flex-col md:flex-row gap-4">
            <li>
              <a href="#home" className="hover:text-primary">
                Home
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-primary">
                Services
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-primary">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-primary">
                Contact
              </a>
            </li>
          </ul>
        </div>
        {/* Right side - newsLetter */}
        <div className="md:w-1/2 w-full">
          <p className="mb-4">
            Subscribe to our newws Letter to recive the latest updates and
            offers!
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-l-md text-black"
            />
            <button className="bg-primary px-6 py-2 rounded-r-md hover:bg-secondary">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      {/* Bottom section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-700 pt-6">
        {/* left side privacy link */}
        <ul className="flex gap-6 mb-4 md:mb-0">
          <li>
            <a href="#privacy"> Privacy Policy</a>
          </li>
          <li>
            <a href="#terms">Terms of Services</a>
          </li>
        </ul>
        {/* right side socials */}
        <div className="flex gap-6">
          <a
            href="http://facebook.com/"
            target="_blank"
            rel="nooperner noreferrer"
          >
            <FaFacebook size={24} />
          </a>
          <a href="http://x.com/" target="_blank" rel="nooperner noreferrer">
            <FaXTwitter size={24} />
          </a>
          <a
            href="http://instagram.com/"
            target="_blank"
            rel="nooperner noreferrer"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
