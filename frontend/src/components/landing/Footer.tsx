"use client";

import Link from "next/link";

const links = [
  { name: "Features", href: "#features" },
  { name: "API", href: "#api" },
  { name: "Pricing", href: "#pricing" },
  { name: "Docs", href: "#" },
  { name: "Terms", href: "#" },
  { name: "Privacy", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <Link href="/" className="text-2xl font-bold text-primary">
              Intent API
            </Link>
            <p className="text-neutral-400 mt-2">
              &copy; {new Date().getFullYear()} Intent API. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end space-x-6">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-neutral-400 hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}