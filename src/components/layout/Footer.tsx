import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Twitter,
  Facebook,
  Instagram,
  Send,
} from 'lucide-react';
import { siteConfig, footerLinks, socialLinks } from '@/data/site-config';

const socialIcons = {
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  pinterest: Instagram,
};

export function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Newsletter Section - Matching site style */}
      <div className="bg-ecospace-green py-12 sm:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 sm:gap-6">
              <div className="w-14 h-14 rounded-2xl bg-black/20 flex items-center justify-center flex-shrink-0">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-white/80 uppercase tracking-widest text-xs sm:text-sm mb-2 font-light">
                  Stay Updated
                </p>
                <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl" style={{ fontWeight: 250 }}>
                  Subscribe to Our <span className="font-medium">Newsletter</span>
                </h3>
              </div>
            </div>
            <div className="w-full lg:w-auto lg:min-w-[400px]">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-white/50 transition-all font-light"
                />
                <button
                  type="submit"
                  className="bg-black text-white px-8 py-4 rounded-full font-light uppercase tracking-widest text-sm hover:bg-gray-900 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative h-10 w-10">
                <Image
                  src="/images/IMG_20251121_085355_649.png"
                  alt="Podcast EcoSpace"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-white font-light text-sm tracking-wide">Podcast</span>
                <span className="text-ecospace-green font-light text-sm tracking-wide ml-1">EcoSpace</span>
              </div>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6 font-light text-sm">
              Dubai's premier podcast studio. Professional recording, expert production, and an experience that transforms your vision into reality.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.icon as keyof typeof socialIcons] || Instagram;
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-ecospace-green hover:border-ecospace-green hover:text-black flex items-center justify-center transition-all duration-300"
                    aria-label={social.platform}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg mb-6 font-light tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-ecospace-green transition-colors font-light text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div>
            <h4 className="text-white text-lg mb-6 font-light tracking-wide">
              Location
            </h4>
            <address className="not-italic space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-ecospace-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-ecospace-green" />
                </div>
                <p className="text-gray-400 font-light text-sm leading-relaxed">
                  {siteConfig.address}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-ecospace-green/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-ecospace-green" />
                </div>
                <p className="text-gray-400 font-light text-sm">
                  {siteConfig.hours}
                </p>
              </div>
            </address>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-lg mb-6 font-light tracking-wide">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-ecospace-green/10 flex items-center justify-center flex-shrink-0 group-hover:bg-ecospace-green transition-colors">
                    <Phone className="w-4 h-4 text-ecospace-green group-hover:text-black transition-colors" />
                  </div>
                  <span className="text-gray-400 font-light text-sm group-hover:text-ecospace-green transition-colors">
                    {siteConfig.phone}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-ecospace-green/10 flex items-center justify-center flex-shrink-0 group-hover:bg-ecospace-green transition-colors">
                    <Mail className="w-4 h-4 text-ecospace-green group-hover:text-black transition-colors" />
                  </div>
                  <span className="text-gray-400 font-light text-sm group-hover:text-ecospace-green transition-colors">
                    {siteConfig.email}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm font-light">
              © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-gray-500 hover:text-ecospace-green text-sm font-light transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-ecospace-green text-sm font-light transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Developer Credit */}
          <div className="mt-4 pt-4 border-t border-white/5 text-center">
            <p className="text-gray-600 text-xs font-light">
              Website by{' '}
              <a
                href="https://reachvivek.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-ecospace-green transition-colors"
                title="Full Stack Developer based in Dubai"
              >
                Vivek Kumar Singh
              </a>
              {' • '}
              <a
                href="https://linkedin.com/in/reachvivek"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-ecospace-green transition-colors"
              >
                Get Your Custom Website
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
