'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera, ChevronDown, ChevronUp } from 'lucide-react';

// Shuffle array function - Fisher-Yates algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const galleryImages = [
  // Studio images (8)
  {
    id: 1,
    src: '/images/studio/_DSC0567.jpg',
    alt: 'Professional podcast studio setup',
    category: 'Studio',
  },
  {
    id: 2,
    src: '/images/studio/_DSC8577.JPG',
    alt: 'Studio recording environment',
    category: 'Studio',
  },
  {
    id: 3,
    src: '/images/studio/_DSC8601.JPG',
    alt: 'Modern podcast studio interior',
    category: 'Studio',
  },
  {
    id: 4,
    src: '/images/studio/_DSC8631.JPG',
    alt: 'Studio space overview',
    category: 'Studio',
  },
  {
    id: 5,
    src: '/images/studio/_DSC8846.JPG',
    alt: 'Professional studio atmosphere',
    category: 'Studio',
  },
  {
    id: 20,
    src: '/images/studio/_DSC8622.JPG',
    alt: 'Studio creative workspace',
    category: 'Studio',
  },
  {
    id: 21,
    src: '/images/studio/_DSC8650.JPG',
    alt: 'Studio production setup',
    category: 'Studio',
  },
  {
    id: 22,
    src: '/images/studio/_DSC8668.JPG',
    alt: 'Professional recording space',
    category: 'Studio',
  },

  // Community/Guests images (7) - FOCUS
  {
    id: 6,
    src: '/images/community/_DSC0581.JPG',
    alt: 'Podcast guests in conversation',
    category: 'Guests',
  },
  {
    id: 7,
    src: '/images/community/_DSC0596.JPG',
    alt: 'Community podcast session',
    category: 'Guests',
  },
  {
    id: 8,
    src: '/images/community/_DSC7234.JPG',
    alt: 'Engaging podcast interview',
    category: 'Guests',
  },
  {
    id: 9,
    src: '/images/community/_DSC8858.JPG',
    alt: 'Guest speaker recording',
    category: 'Guests',
  },
  {
    id: 10,
    src: '/images/community/_DSC8876.JPG',
    alt: 'Community content creation',
    category: 'Guests',
  },
  {
    id: 11,
    src: '/images/community/_DSC8899.JPG',
    alt: 'Collaborative podcast session',
    category: 'Guests',
  },
  {
    id: 12,
    src: '/images/community/DSC08909.JPG',
    alt: 'Dynamic podcast discussion',
    category: 'Guests',
  },

  // Equipment images (7)
  {
    id: 13,
    src: '/images/equipment/_DSC8604.JPG',
    alt: 'Professional recording equipment',
    category: 'Equipment',
  },
  {
    id: 14,
    src: '/images/equipment/_DSC8665.JPG',
    alt: 'Audio setup and microphones',
    category: 'Equipment',
  },
  {
    id: 15,
    src: '/images/equipment/_DSC8733.JPG',
    alt: 'Studio gear and technology',
    category: 'Equipment',
  },
  {
    id: 16,
    src: '/images/equipment/_DSC8743.JPG',
    alt: 'Recording equipment detail',
    category: 'Equipment',
  },
  {
    id: 17,
    src: '/images/equipment/_DSC8848.JPG',
    alt: 'Professional audio equipment',
    category: 'Equipment',
  },
  {
    id: 18,
    src: '/images/equipment/_DSC8883.JPG',
    alt: 'Studio production tools',
    category: 'Equipment',
  },
  {
    id: 19,
    src: '/images/equipment/_DSC8904.JPG',
    alt: 'Complete recording setup',
    category: 'Equipment',
  },
];


export function StudioGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [showAll, setShowAll] = useState(false);
  const [shuffledImages, setShuffledImages] = useState(galleryImages);

  const categories = ['All', 'Studio', 'Equipment', 'Guests'];

  // Shuffle images on mount
  useEffect(() => {
    setShuffledImages(shuffleArray(galleryImages));
  }, []);

  const filteredImages = filter === 'All'
    ? shuffledImages
    : shuffledImages.filter(img => img.category === filter);

  // Show 8 images initially, all when expanded
  const displayedImages = showAll ? filteredImages : filteredImages.slice(0, 8);

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
            {displayedImages.map((image, index) => (
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

        {/* View More Button */}
        {filteredImages.length > 8 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mt-8"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-ecospace-green/50 text-white hover:text-ecospace-green transition-all duration-300"
            >
              <span className="text-sm font-light uppercase tracking-wider">
                {showAll ? 'View Less' : `View More (${filteredImages.length - 8} more)`}
              </span>
              {showAll ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </motion.div>
        )}

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
