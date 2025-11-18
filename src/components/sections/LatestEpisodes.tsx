'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { EpisodeCard } from './EpisodeCard';
import { Episode } from '@/types/podcast';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface LatestEpisodesProps {
  episodes: Episode[];
}

export function LatestEpisodes({ episodes }: LatestEpisodesProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header with Navigation Arrows */}
        <motion.div
          className="flex flex-row items-center justify-between mb-16 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="text-left">
            <motion.p
              variants={titleVariants}
              className="text-[#FF5722] font-semibold uppercase tracking-wider text-base mb-3"
              style={{ fontSize: '15px', letterSpacing: '0.1em' }}
            >
              Enjoy New Shows
            </motion.p>
            <motion.h2
              variants={titleVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-black"
              style={{ fontSize: '48px', fontWeight: 700, letterSpacing: '-0.02em' }}
            >
              Latest episodes
            </motion.h2>
          </div>

          {/* Navigation Arrows */}
          <motion.div variants={titleVariants} className="flex gap-4 flex-shrink-0">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-gray-100 hover:bg-primary hover:text-white text-gray-700 flex items-center justify-center transition-all shadow-md hover:shadow-lg"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-gray-100 hover:bg-primary hover:text-white text-gray-700 flex items-center justify-center transition-all shadow-md hover:shadow-lg"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        </motion.div>

        {/* Episodes Carousel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={1}
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
            className="latest-episodes-carousel"
          >
            {episodes.map((episode, index) => (
              <SwiperSlide key={episode.id}>
                <EpisodeCard episode={episode} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
