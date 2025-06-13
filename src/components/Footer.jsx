
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

function Footer() {
  return (
    <footer className="bg-[#F2F0EF] border-t border-[#BBBDBC] py-12 sm:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row flex-wrap md:flex-nowrap gap-6 md:gap-10">
          {/* Left: Logo + Copyright */}
          <div className="w-full md:w-4/12">
            <div className="mb-4">
              <Logo width="100px" className="h-10 sm:h-12" />
            </div>
            <p className="text-sm sm:text-base text-[#245F73] font-semibold">
              © {new Date().getFullYear()} All Rights Reserved by DevUI.
            </p>
          </div>

          {/* Links */}
          {[ 
            { title: "Company", links: ["Features", "Pricing", "Affiliate Program", "Press Kit"] },
            { title: "Support", links: ["Account", "Help", "Contact Us", "Customer Support"] },
            { title: "Legals", links: ["Terms & Conditions", "Privacy Policy", "Licensing"] },
          ].map((section, i) => (
            <div key={i} className="w-full md:w-2/12">
              <h3 className="text-sm sm:text-base font-bold uppercase text-[#245F73] mb-4 tracking-wide">
                {section.title}
              </h3>
              <ul>
                {section.links.map((link, j) => (
                  <li key={j} className="mb-2">
                    <Link
                      to="/"
                      className="text-sm sm:text-base text-[#733E24] hover:text-[#245F73] transition-colors duration-300 font-medium"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
