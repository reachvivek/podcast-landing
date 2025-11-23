import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.addOnService.deleteMany();
  await prisma.servicePackage.deleteMany();

  console.log('✅ Cleared existing data');

  // Create Service Packages
  const servicePackages = await Promise.all([
    prisma.servicePackage.create({
      data: {
        name: 'Audio Only',
        slug: 'audio-only',
        description: 'Professional audio recording with post-production editing',
        price: 350,
        duration: 2,
        features: [
          'Professional audio recording',
          'Basic post-production editing',
          'Noise reduction & enhancement',
          'Final mix & master',
          'MP3 & WAV delivery'
        ],
        notIncluded: [],
        isActive: true,
        category: 'recording-only',
      },
    }),
    prisma.servicePackage.create({
      data: {
        name: 'Podcast + Editing',
        slug: 'podcast-editing',
        description: 'Complete podcast production with professional editing',
        price: 750,
        duration: 2,
        features: [
          'Professional audio recording',
          'Advanced editing & mixing',
          'Intro/outro integration',
          'Sound effects & music',
          'Shownotes preparation',
          'Multiple format delivery'
        ],
        notIncluded: [],
        isActive: true,
        category: 'podcast-editing',
        isPopular: true,
      },
    }),
    prisma.servicePackage.create({
      data: {
        name: 'Video 1-Cam',
        slug: 'video-1cam',
        description: 'Single camera video podcast with professional audio',
        price: 900,
        duration: 2,
        features: [
          'Single 4K camera setup',
          'Professional audio recording',
          'Basic color correction',
          'Simple editing',
          'HD video delivery',
          'Audio files included'
        ],
        notIncluded: [],
        isActive: true,
        category: 'podcast-editing',
      },
    }),
    prisma.servicePackage.create({
      data: {
        name: 'Video 2-Cam',
        slug: 'video-2cam',
        description: 'Multi-camera setup for dynamic video podcasts',
        price: 1200,
        duration: 2,
        features: [
          'Dual 4K camera setup',
          'Professional audio recording',
          'Advanced color grading',
          'Multi-angle editing',
          '4K video delivery',
          'Social media clips',
          'Audio files included'
        ],
        notIncluded: [],
        isActive: true,
        category: 'podcast-editing',
        isPopular: true,
      },
    }),
    prisma.servicePackage.create({
      data: {
        name: 'Video 3-Cam Premium',
        slug: 'video-3cam-premium',
        description: 'Premium multi-camera production with full post-production',
        price: 1800,
        originalPrice: 2200,
        duration: 2,
        features: [
          'Triple 4K camera setup',
          'Professional audio & lighting',
          'Cinematic color grading',
          'Advanced multi-angle editing',
          '4K video delivery',
          'Social media reels package',
          'Thumbnail designs (3)',
          'Audio files & transcripts'
        ],
        notIncluded: [],
        isActive: true,
        category: 'podcast-editing',
      },
    }),
  ]);

  console.log(`✅ Created ${servicePackages.length} service packages`);

  // Create Add-On Services
  const addOnServices = await Promise.all([
    prisma.addOnService.create({
      data: {
        name: 'Extra Camera Angle',
        slug: 'extra-camera',
        description: 'Additional camera perspective for richer content',
        price: 200,
        icon: 'Camera',
        isActive: true,
      },
    }),
    prisma.addOnService.create({
      data: {
        name: 'Social Media Clips',
        slug: 'social-reels',
        description: '5-10 short-form clips optimized for Instagram/TikTok',
        price: 200,
        icon: 'Film',
        isActive: true,
      },
    }),
    prisma.addOnService.create({
      data: {
        name: 'Thumbnail Design',
        slug: 'thumbnail-design',
        description: 'Professional custom thumbnail design (3 variations)',
        price: 150,
        icon: 'Palette',
        isActive: true,
      },
    }),
    prisma.addOnService.create({
      data: {
        name: 'Extra Studio Hour',
        slug: 'extra-hour',
        description: 'Additional hour of studio time',
        price: 150,
        icon: 'Clock',
        isActive: true,
      },
    }),
    prisma.addOnService.create({
      data: {
        name: 'Custom Intro/Outro',
        slug: 'custom-intro',
        description: 'Professionally produced branded intro and outro',
        price: 300,
        icon: 'Music',
        isActive: true,
      },
    }),
    prisma.addOnService.create({
      data: {
        name: 'Additional Guest Mic',
        slug: 'extra-guest',
        description: 'Extra microphone setup for additional guest',
        price: 100,
        icon: 'Users',
        isActive: true,
      },
    }),
    prisma.addOnService.create({
      data: {
        name: 'Live Streaming',
        slug: 'live-streaming',
        description: 'Stream your podcast live to multiple platforms',
        price: 400,
        icon: 'Radio',
        isActive: true,
      },
    }),
    prisma.addOnService.create({
      data: {
        name: 'Transcription Service',
        slug: 'transcription',
        description: 'Full episode transcription with timestamps',
        price: 120,
        icon: 'FileText',
        isActive: true,
      },
    }),
  ]);

  console.log(`✅ Created ${addOnServices.length} add-on services`);

  console.log('🎉 Database seeded successfully!');
  console.log('\n📊 Summary:');
  console.log(`   - Service Packages: ${servicePackages.length}`);
  console.log(`   - Add-On Services: ${addOnServices.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
