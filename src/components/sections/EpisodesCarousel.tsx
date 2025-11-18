'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';
import { Play, Headphones } from 'lucide-react';
import { Episode } from '@/types/podcast';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface EpisodesCarouselProps {
  episodes: Episode[];
  title?: string;
  subtitle?: string;
}

export function EpisodesCarousel({
  episodes,
  title = 'Trending Now',
  subtitle = 'Most Popular Episodes',
}: EpisodesCarouselProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[#FF5722] font-semibold uppercase tracking-wider mb-3" style={{ fontSize: '15px', letterSpacing: '0.1em' }}>
            {subtitle}
          </p>
          <h2 className="text-black font-bold" style={{ fontSize: '48px', fontWeight: 700, letterSpacing: '-0.02em' }}>{title}</h2>
        </div>

        {/* Carousel with padding for arrows */}
        <div className="relative px-16">
          <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="episodes-carousel"
        >
          {episodes.map((episode) => (
            <SwiperSlide key={episode.id}>
              <Link href={`/podcast/${episode.id}`} className="group block">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-orange-500 to-red-600">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundImage: episode.imageUrl
                          ? `url(${episode.imageUrl})`
                          : undefined,
                      }}
                    />

                    {/* Guest Image Badge */}
                    {episode.guestImage && (
                      <div className="absolute top-4 right-4 w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-lg">
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${episode.guestImage})` }}
                        />
                      </div>
                    )}

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                        <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                      </div>
                    </div>

                    {/* Episode Number Badge */}
                    <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white text-xs font-semibold">
                        EP {episode.episodeNumber}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category */}
                    <div className="flex items-center gap-2 mb-3">
                      <Headphones className="w-5 h-5 text-[#FF5722]" />
                      <span className="text-[#FF5722] font-bold uppercase tracking-wide" style={{ fontSize: '15px', fontWeight: 700 }}>
                        {episode.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-black mb-3 line-clamp-2 transition-colors" style={{ fontSize: '22px', fontWeight: 700, lineHeight: '1.4' }}>
                      {episode.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 line-clamp-2 mb-4" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                      {episode.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-gray-500" style={{ fontSize: '14px' }}>
                      <span className="font-medium">{episode.host}</span>
                      <span className="font-medium">{episode.duration}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .episodes-carousel .swiper-button-prev,
        .episodes-carousel .swiper-button-next {
          color: #fff;
          background: linear-gradient(135deg, #ff5722 0%, #f4511e 100%);
          width: 55px;
          height: 55px;
          border-radius: 50%;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 20px rgba(255, 87, 34, 0.35);
          border: 3px solid white;
          backdrop-filter: blur(10px);
          top: 50%;
          margin-top: -27px;
          z-index: 50;
        }

        .episodes-carousel .swiper-button-prev {
          left: -60px;
        }

        .episodes-carousel .swiper-button-next {
          right: -60px;
        }

        .episodes-carousel .swiper-button-prev:hover,
        .episodes-carousel .swiper-button-next:hover {
          background: linear-gradient(135deg, #f4511e 0%, #e64a19 100%);
          transform: scale(1.15);
          box-shadow: 0 12px 28px rgba(255, 87, 34, 0.5);
          border-color: white;
        }

        .episodes-carousel .swiper-button-prev:active,
        .episodes-carousel .swiper-button-next:active {
          transform: scale(1.05);
        }

        .episodes-carousel .swiper-button-prev:after,
        .episodes-carousel .swiper-button-next:after {
          font-size: 20px;
          font-weight: 900;
        }

        .episodes-carousel .swiper-button-disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .episodes-carousel .swiper-pagination-bullet {
          background: #cbd5e0;
          width: 12px;
          height: 12px;
          opacity: 1;
          transition: all 0.3s ease;
          border-radius: 6px;
        }

        .episodes-carousel .swiper-pagination-bullet-active {
          background: linear-gradient(135deg, #ff5722 0%, #f4511e 100%);
          width: 36px;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(255, 87, 34, 0.4);
        }

        .episodes-carousel .swiper-pagination {
          bottom: -40px;
        }

        .episodes-carousel {
          padding-bottom: 60px;
        }
      `}</style>
    </section>
  );
}
