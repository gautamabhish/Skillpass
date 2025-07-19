import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white text-[#3b4658] pt-10 pb-4">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Column Layout: Four Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Column 1: Branding */}
          <div className="flex flex-col">
            <div className="text-2xl font-bold text-[#3277ee] mb-2 uppercase ">
              SkillPass
            </div>
            <p className="text-gray-600">
              Certify what you've learned.
            </p>
          </div>
          
          {/* Column 2: Product */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Product</h2>
            <ul>
              <li className="mb-2">
                <a href="/product#Overview" className="text-gray-700 hover:text-[#3277ee] transition">
                  Overview
                </a>
              </li>
              <li className="mb-2">
                <a href="/product#features" className="text-gray-700 hover:text-[#3277ee] transition">
                  Features
                </a>
              </li>
              <li className="mb-2">
                <a href="/product#pricing" className="text-gray-700 hover:text-[#3277ee] transition">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Company */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Company</h2>
            <ul>
              <li className="mb-2">
                <a href="/support" className="text-gray-700 hover:text-[#3277ee] transition">
                  Support
                </a>
              </li>
              {/* <li className="mb-2">
                <a href="#" className="text-gray-700 hover:text-[#3277ee] transition">
                  Blog
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-700 hover:text-[#3277ee] transition">
                  Careers
                </a>
              </li> */}
              <li className="mb-2">
                <a href="https://discord.gg/seuzp8Ms" target='blank' className="text-gray-700 hover:text-[#3277ee] transition">
                  Connect
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Legal & Help */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Legal & Help</h2>
            <ul>
              <li className="mb-2">
                <a href="/legal" className="text-gray-700 hover:text-[#3277ee] transition">
                  Terms of Service
                </a>
              </li>
              <li className="mb-2">
                <a href="/legal" className="text-gray-700 hover:text-[#3277ee] transition">
                  Privacy Policy
                </a>
              </li>
              <li className="mb-2">
                <a href="/legal" className="text-gray-700 hover:text-[#3277ee] transition">
                  Support
                </a>
              </li>
              <li className="mb-2">
                <a href="/legal" className="text-gray-700 hover:text-[#3277ee] transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Skillpass. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
