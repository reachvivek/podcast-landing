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
        name: 'Recording Only',
        slug: 'recording-only',
        description: 'Perfect for self-editors who want raw files',
        price: 350,
        originalPrice: 550,
        duration: 1,
        features: [
          'Studio recording (1 hour)',
          'Professional sound setup',
          'Studio lighting',
          'Raw files delivered via link'
        ],
        notIncluded: [
          'Video recording',
          'Editing services',
          'Color correction'
        ],
        isActive: true,
        category: 'recording-only',
        sortOrder: 1,
      },
    }),
    prisma.servicePackage.create({
      data: {
        name: 'Podcast + Editing',
        slug: 'podcast-editing',
        description: 'Complete video podcast production',
        price: 750,
        originalPrice: 980,
        duration: 1,
        features: [
          'One-hour video recording',
          '2-camera setup',
          'Professional sound & lights',
          'Full professional editing',
          'Color correction',
          'Ready-to-publish video'
        ],
        notIncluded: [],
        isActive: true,
        category: 'podcast-editing',
        isPopular: true,
        sortOrder: 2,
      },
    }),
    prisma.servicePackage.create({
      data: {
        name: 'Studio Rental',
        slug: 'studio-rental',
        description: 'Bring your own equipment',
        price: 200,
        originalPrice: 300,
        duration: 1,
        features: [
          'Full studio access',
          'Use your own equipment',
          'Flexible booking hours',
          'Air-conditioned space'
        ],
        notIncluded: [
          'Equipment rental',
          'Editing services',
          'Engineer assistance'
        ],
        isActive: true,
        category: 'studio-rental',
        sortOrder: 3,
      },
    }),
    // Social Media Reels Packages
    prisma.servicePackage.create({
      data: {
        name: 'Single Reel',
        slug: 'single-reel',
        description: 'Quick promo video for social media',
        price: 250,
        duration: 1,
        features: [
          'Professional recording',
          'Quick turnaround (24-48h)',
          'Optimized for IG/TikTok',
          'Music & captions included'
        ],
        notIncluded: [],
        isActive: true,
        category: 'reels',
        sortOrder: 4,
      },
    }),
    prisma.servicePackage.create({
      data: {
        name: '5 Reels Package',
        slug: '5-reels-package',
        description: 'Save 300 AED on bulk reels',
        price: 950,
        originalPrice: 1250,
        duration: 2,
        features: [
          '5 professional reels',
          'Consistent branding',
          'Multiple format delivery',
          'Music & captions included',
          '190 AED per reel'
        ],
        notIncluded: [],
        isActive: true,
        category: 'reels',
        sortOrder: 5,
      },
    }),
    prisma.servicePackage.create({
      data: {
        name: '10 Reels Package',
        slug: '10-reels-package',
        description: 'Best Value! Perfect for content creators',
        price: 3900,
        originalPrice: 5000,
        duration: 3,
        features: [
          '10 professional reels',
          'Content strategy consultation',
          'Custom branding',
          'Priority turnaround',
          'Music & captions included',
          '390 AED per reel'
        ],
        notIncluded: [],
        isActive: true,
        category: 'reels',
        sortOrder: 6,
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
