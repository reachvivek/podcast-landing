'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera, Mic2, Video, Lightbulb } from 'lucide-react';

const galleryImages = [
  {
    id: 1,
    src: '/images/studio-hero-12.jpg',
    alt: 'Professional podcast interview',
    category: 'Studio',
  },
  {
    id: 2,
    src: '/images/studio-hero-8.jpg',
    alt: 'Female podcaster recording',
    category: 'Sessions',
  },
  {
    id: 3,
    src: '/images/studio-portfolio-4.jpg',
    alt: 'Studio ambiance & lighting',
    category: 'Lighting',
  },
  {
    id: 4,
    src: '/images/studio-hero-10.jpg',
    alt: 'Recording setup overview',
    category: 'Equipment',
  },
  {
    id: 5,
    src: '/images/studio-portfolio-6.jpg',
    alt: 'Modern studio interior',
    category: 'Studio',
  },
  {
    id: 6,
    src: '/images/studio-hero-7.jpg',
    alt: 'Live podcast session',
    category: 'Sessions',
  },
];

const studioFeatures = [
  {
    icon: Camera,
    title: '4K Cameras',
    description: 'Sony professional cameras with cinema lenses',
  },
  {
    icon: Mic2,
    title: 'Pro Audio',
    description: 'Shure SM7B mics with Rodecaster interface',
  },
  {
    icon: Video,
    title: 'Multi-Angle',
    description: '2-3 camera setup for dynamic content',
  },
  {
    icon: Lightbulb,
    title: 'Studio Lighting',
    description: 'Professional LED panels & key lights',
  },
];

export function StudioGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Studio', 'Equipment', 'Sessions', 'Lighting'];

  const filteredImages = filter === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === filter);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === filteredImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <section id="studio" className="py-24 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #A8D646 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-ecospace-green uppercase tracking-widest text-sm mb-4 font-light">
            Our Space
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6" style={{ fontWeight: 250 }}>
            Explore the{' '}
            <span className="text-ecospace-green">Studio</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">
            State-of-the-art podcast studio equipped with professional gear for exceptional content creation.
          </p>
        </motion.div>

        {/* Studio Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {studioFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className="p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-ecospace-green/50 transition-all duration-300 text-center group"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-ecospace-green/10 flex items-center justify-center mb-4 group-hover:bg-ecospace-green/20 transition-colors">
                <feature.icon className="w-6 h-6 text-ecospace-green" />
              </div>
              <h3 className="text-white font-medium mb-1 text-sm sm:text-base">{feature.title}</h3>
              <p className="text-gray-500 text-xs sm:text-sm">{feature.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 sm:px-6 py-2 rounded-full text-sm font-light transition-all duration-300 ${
                filter === category
                  ? 'bg-ecospace-green text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer group ${
                  index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs text-ecospace-green uppercase tracking-wider">{image.category}</span>
                  <p className="text-white text-sm font-light mt-1">{image.alt}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="/book"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-ecospace-green text-black font-light hover:bg-ecospace-green/90 transition-all duration-300 uppercase tracking-widest text-sm"
          >
            <Camera className="w-5 h-5" />
            Book a Studio Tour
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredImages[selectedImage].src}
                alt={filteredImages[selectedImage].alt}
                fill
                className="object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-ecospace-green text-sm uppercase tracking-wider">
                  {filteredImages[selectedImage].category}
                </span>
                <p className="text-white text-lg">{filteredImages[selectedImage].alt}</p>
              </div>
            </motion.div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {selectedImage + 1} / {filteredImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
