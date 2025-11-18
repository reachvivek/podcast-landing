'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig, navigation } from '@/data/site-config';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <svg
                className="w-10 h-10 text-white"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 5v30M10 15h20M12 25h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <div className="ml-2">
                <div className="text-white font-bold text-xl tracking-wider">
                  {siteConfig.name}
                </div>
                <div className="text-gray-400 text-xs tracking-widest">
                  {siteConfig.tagline}
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="text-white hover:text-primary transition-colors text-sm font-medium uppercase tracking-wide py-2 block"
                >
                  {item.name}
                  {item.children && (
                    <svg
                      className="inline-block ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>

                {/* Dropdown Menu - with padding bridge to prevent disappearing */}
                {item.children && (
                  <div className="absolute left-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-black/95 backdrop-blur-sm border border-white/10 rounded-md shadow-lg">
                      <div className="py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-gray-300 hover:text-primary hover:bg-white/5 transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-white hover:text-primary transition-colors p-2"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Donate Button */}
            <Button
              asChild
              className="hidden md:flex bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-5"
            >
              <Link href="/donate" className="flex items-center space-x-2">
                <Heart className="w-4 h-4 fill-current" />
                <span className="font-semibold uppercase text-sm tracking-wide">
                  Donate Us
                </span>
              </Link>
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white hover:text-primary transition-colors p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10">
            {navigation.map((item) => (
              <div key={item.name} className="py-2">
                <Link
                  href={item.href}
                  className="block text-white hover:text-primary transition-colors text-sm font-medium uppercase tracking-wide py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.children && (
                  <div className="pl-4 mt-2 space-y-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block text-gray-400 hover:text-primary transition-colors text-sm py-1"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4">
              <Button
                asChild
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-5"
              >
                <Link href="/donate" className="flex items-center justify-center space-x-2">
                  <Heart className="w-4 h-4 fill-current" />
                  <span className="font-semibold uppercase text-sm tracking-wide">
                    Donate Us
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* Search Bar */}
        {searchOpen && (
          <div className="py-4 border-t border-white/10">
            <input
              type="search"
              placeholder="Search podcasts..."
              className="w-full bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
          </div>
        )}
      </nav>
    </header>
  );
}
