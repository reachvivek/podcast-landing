'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationItem {
  readonly name: string;
  readonly href: string;
}

interface HeaderProps {
  readonly logo?: string;
  readonly siteName?: string;
  readonly navigation?: readonly NavigationItem[];
  readonly ctaText?: string;
  readonly ctaHref?: string;
}

const defaultNavigation: readonly NavigationItem[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '#contact' },
];

export function Header({
  logo = '/images/IMG_20251121_085355_649.png',
  siteName = 'Podcast EcoSpace',
  navigation = defaultNavigation,
  ctaText = 'Book Studio',
  ctaHref = '/book',
}: Readonly<HeaderProps>) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 w-[95%] max-w-6xl px-4 md:px-6 py-2 md:py-3 border shadow-lg ${
        isScrolled
          ? 'backdrop-blur-xl bg-black/20 border-white/20'
          : 'backdrop-blur-md bg-white/5 border-white/10'
      }`}
      style={{ borderRadius: '4rem' }}
    >
      <div className="flex items-center justify-between">
        {/* Mobile: Empty spacer for centering */}
        <div className="lg:hidden w-10" />

        {/* Logo - Centered on mobile, left on desktop */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:flex-none"
        >
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-10 w-10 flex-shrink-0">
              <Image
                src={logo}
                alt={siteName}
                width={40}
                height={40}
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-light text-sm tracking-wide">Podcast</span>
              <span className="text-ecospace-green font-light text-sm tracking-wide ml-1">EcoSpace</span>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation - Center */}
        <nav className="hidden lg:flex flex-grow justify-center">
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex space-x-8"
          >
            {navigation.map((link, index) => (
              <motion.li
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.1 },
                }}
              >
                <Link
                  href={link.href}
                  className="text-white/70 hover:text-ecospace-green font-light text-sm tracking-widest uppercase transition-all duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-ecospace-green transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </nav>

        {/* Book Studio Button - Desktop with Shimmer */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:block"
        >
          <Link
            href={ctaHref}
            className="relative overflow-hidden inline-flex items-center gap-2 px-5 py-2 text-sm font-light text-white border border-white/40 rounded-full hover:bg-ecospace-green hover:text-black hover:border-ecospace-green transition-all duration-300 uppercase tracking-widest group"
          >
            {/* Shimmer Effect */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
            <Calendar className="w-4 h-4 relative z-10" />
            <span className="relative z-10">{ctaText}</span>
          </Link>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:hidden text-white hover:text-ecospace-green transition-colors p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden mt-4 pt-4 border-t border-white/10"
          >
            <nav>
              <ul className="flex flex-col space-y-3">
                {navigation.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: index * 0.1 },
                    }}
                  >
                    <Link
                      href={link.href}
                      className="block text-white/80 hover:text-ecospace-green font-light text-sm tracking-widest uppercase transition-colors duration-300 py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
                <li className="pt-2">
                  <Link
                    href={ctaHref}
                    className="relative overflow-hidden inline-flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-light text-white border border-white/40 rounded-full hover:bg-ecospace-green hover:text-black hover:border-ecospace-green transition-all duration-300 uppercase tracking-widest group"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {/* Shimmer Effect */}
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                    <Calendar className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">{ctaText}</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
