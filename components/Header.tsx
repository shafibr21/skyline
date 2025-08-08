"use client";

import { Search } from "lucide-react";

/**
 * Header component with navigation and search functionality
 */
export default function Header() {
  return (
    <>
      {/* Main header with logo and navigation */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">SKYLINE</div>
            </div>

            {/* Navigation menu */}
            <nav className="hidden md:flex space-x-8">
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Support
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Contact
              </a>  
            </nav>

            {/* Language selector */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">🌐 ENG</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
