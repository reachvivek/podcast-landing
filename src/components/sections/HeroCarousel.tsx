'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Play } from 'lucide-react';
import Link from 'next/link';
import { Episode } from '@/types/podcast';
import { podcastPlatforms } from '@/data/site-config';
import { Button } from '@/components/ui/button';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface HeroCarouselProps {
  episodes: Episode[];
}

export function HeroCarousel({ episodes }: HeroCarouselProps) {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        className="hero-carousel"
      >
        {episodes.slice(0, 3).map((episode, index) => (
          <SwiperSlide key={episode.id}>
            <div className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
              {/* Background with Red/Orange Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-red-800/80 to-orange-900/90">
                <div
                  className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-40"
                  style={{
                    backgroundImage: episode.imageUrl
                      ? `url(${episode.imageUrl})`
                      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-1/3 h-full">
                <div className="absolute top-20 right-10 text-orange-500/30">
                  <div className="text-[200px] font-bold leading-none">///</div>
                </div>
                <div className="absolute top-40 right-40">
                  <div className="border-4 border-orange-500/30 p-4">
                    <div className="text-orange-500/50 text-xs space-y-1">
                      <div>HOLLYWOOD</div>
                      <div>PRODUCTION________</div>
                      <div>DIRECTOR__________</div>
                      <div>CAMERA____________</div>
                      <div>___DATE___SCENE___TAKE</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
                <div className="mb-4">
                  <span className="text-white/80 text-sm md:text-base uppercase tracking-widest">
                    {episode.category}
                  </span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 max-w-4xl mx-auto">
                  {episode.title}
                </h1>

                <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-8">
                  {episode.description}
                </p>

                {/* Episode Info */}
                <div className="flex items-center justify-center gap-4 text-white/80 text-sm md:text-base mb-8">
                  <span>{episode.host}</span>
                  <span>•</span>
                  <span>Episode {episode.episodeNumber}</span>
                  <span>•</span>
                  <span>{episode.duration}</span>
                </div>

                {/* Podcast Platform Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {podcastPlatforms.map((platform) => (
                    <Button
                      key={platform.name}
                      asChild
                      className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-sm md:text-base font-semibold uppercase tracking-wide shadow-lg hover:shadow-xl transition-all"
                    >
                      <a
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2"
                      >
                        {platform.icon === 'soundcloud' && (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12.5v5.8c0 .2.1.3.3.3h9.4c.2 0 .3-.1.3-.3V12h-10zm10-2c-.1-2.2-1.9-3.9-4-3.9-.5 0-1 .1-1.5.3V6.2c0-.2-.1-.3-.3-.3h-3.9c-.2 0-.3.1-.3.3v11.1c0 .2.1.3.3.3h9.4c.2 0 .3-.1.3-.3v-7z" />
                          </svg>
                        )}
                        {platform.icon === 'spotify' && (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                          </svg>
                        )}
                        {platform.icon === 'apple' && (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                          </svg>
                        )}
                        <span>{platform.name.toUpperCase()}</span>
                      </a>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Bottom Gradient Fade */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .hero-carousel .swiper-button-prev,
        .hero-carousel .swiper-button-next {
          color: #fff;
          background: rgba(255, 87, 34, 0.8);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .hero-carousel .swiper-button-prev:hover,
        .hero-carousel .swiper-button-next:hover {
          background: #ff5722;
          transform: scale(1.1);
        }

        .hero-carousel .swiper-button-prev:after,
        .hero-carousel .swiper-button-next:after {
          font-size: 20px;
          font-weight: bold;
        }

        .hero-carousel .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5);
          width: 12px;
          height: 12px;
          opacity: 1;
        }

        .hero-carousel .swiper-pagination-bullet-active {
          background: #ff5722;
          width: 40px;
          border-radius: 6px;
          transition: width 0.3s ease;
        }

        .hero-carousel .swiper-pagination {
          bottom: 30px;
        }
      `}</style>
    </div>
  );
}
