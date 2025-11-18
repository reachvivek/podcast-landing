import React from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Twitter,
  Facebook,
  Instagram,
} from 'lucide-react';
import { siteConfig, footerLinks, socialLinks } from '@/data/site-config';

const socialIcons = {
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  pinterest: Instagram, // Using Instagram as placeholder
};

export function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Newsletter Section */}
      <div className="bg-[#FF5722] py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center space-x-4">
              <Mail className="w-12 h-12 text-white" />
              <div>
                <div className="text-white/90 uppercase tracking-wider mb-1" style={{ fontSize: '14px', letterSpacing: '0.08em', fontWeight: 500 }}>
                  Get early access to the new episodes.
                </div>
                <h3 className="text-white font-bold" style={{ fontSize: '36px', fontWeight: 700 }}>Subscribe to newsletter!</h3>
              </div>
            </div>
            <div className="w-full md:w-auto md:min-w-[450px]">
              <form className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-full bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all shadow-lg"
                  style={{ fontSize: '15px', fontWeight: 400 }}
                />
                <button
                  type="submit"
                  className="bg-black text-white px-10 py-4 rounded-full font-bold uppercase hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                  style={{ fontSize: '13px', letterSpacing: '0.08em', fontWeight: 700 }}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Our pick of the best podcasts on Spotify, Apple Podcasts and more
              covering all trends.
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
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FF5722] flex items-center justify-center transition-colors"
                    aria-label={social.platform}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Explore Section */}
          <div>
            <h4 className="text-xl font-bold mb-6 flex items-center">
              <span className="text-[#FF5722] mr-2">♥</span>
              Explore
            </h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#FF5722] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Find Section */}
          <div>
            <h4 className="text-xl font-bold mb-6 flex items-center">
              <span className="text-[#FF5722] mr-2">♥</span>
              Find
            </h4>
            <address className="not-italic space-y-3">
              <p className="text-gray-400 flex items-start">
                <MapPin className="w-5 h-5 mr-2 flex-shrink-0 mt-1 text-[#FF5722]" />
                <span>{siteConfig.address}</span>
              </p>
            </address>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-xl font-bold mb-6 flex items-center">
              <span className="text-[#FF5722] mr-2">♥</span>
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <Phone className="w-5 h-5 mr-2 text-[#FF5722]" />
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="hover:text-[#FF5722] transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center text-gray-400">
                <Clock className="w-5 h-5 mr-2 text-[#FF5722]" />
                {siteConfig.hours}
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="w-5 h-5 mr-2 text-[#FF5722]" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-[#FF5722] transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
