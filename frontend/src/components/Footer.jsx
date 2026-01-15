import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-[#030d46] text-white pt-10 pb-6 px-14">
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-8 border-b border-blue-700 pb-8">
        <div>
          <h1 className="text-2xl font-bold">NeoLearn Pro</h1>
          <p className="text-sm text-blue-300 mt-1">
            Transforming Education Into Next level Insights
          </p>
        </div>
      </div>

      <div className="container mx-auto mt-6 flex flex-col items-center gap-4">
        <div className="flex space-x-4 text-white text-lg ">
          <a
            href="https://x.com/HarshGo02998624?t=8F9GJAr57s2L_vQ2kGtjoQ&s=08"
            target="_blank"
            rel="noopener noreferrer"
            className="border p-2 rounded-full"
          >
            <FaXTwitter className="hover:text-blue-300" />
          </a>
          <a href="https://www.instagram.com/harsh_goyal5623?igsh=MWczeHNidWR5dnF5bA==" target="_blank"
  rel="noopener noreferrer"className="border p-2 rounded-full">
            <FaInstagram className="hover:text-blue-300" />
          </a>
          <a
            href="https://www.linkedin.com/in/harshgoyal20/"
            target="_blank"
            rel="noopener noreferrer"
            className="border p-2 rounded-full "
          >
            <FaLinkedinIn className="hover:text-blue-300" />
          </a>
          <a
            href="https://youtube.com/@harshgoyal9546?si=2MbPCDFWUCxXRfvo"
            target="_blank"
            rel="noopener noreferrer"
            className="border p-2 rounded-full"
          >
            <FaYoutube className="hover:text-blue-300" />
          </a>
        </div>
        <p className="text-sm lg:text-lg text-blue-300">
          © {new Date().getFullYear()} NeoLearn Pro. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
