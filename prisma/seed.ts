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
    // Podcast Small Package - 1 camera
    prisma.servicePackage.create({
      data: {
        name: 'Podcast Small Package',
        slug: 'podcast-small',
        description: 'Studio recording one hour with one camera',
        price: 190,
        originalPrice: 380,
        duration: 1,
        features: [
          'One-hour studio recording',
          '1-camera setup',
          'Clean sound & professional lights',
          'Original files delivered via link',
          'No editing included'
        ],
        notIncluded: [
          'Video editing',
          'Color correction',
          'Second camera angle'
        ],
        isActive: true,
        category: 'recording-only',
        sortOrder: 1,
      },
    }),
    // Podcast Standard Package - 2 cameras
    prisma.servicePackage.create({
      data: {
        name: 'Podcast Standard Package',
        slug: 'podcast-standard',
        description: 'Studio recording with 2 cameras, sound & lights',
        price: 320,
        originalPrice: 640,
        duration: 1,
        features: [
          'One-hour studio recording',
          '2-camera setup',
          'Professional sound & lights',
          'Original files delivered via link',
          'No editing included'
        ],
        notIncluded: [
          'Video editing',
          'Color correction',
          'Post-production'
        ],
        isActive: true,
        category: 'recording-only',
        sortOrder: 2,
      },
    }),
    // Horizontal Podcast + Editing
    prisma.servicePackage.create({
      data: {
        name: 'Horizontal Podcast + Editing',
        slug: 'horizontal-podcast-editing',
        description: 'Complete video podcast production with full editing',
        price: 750,
        originalPrice: 980,
        duration: 1,
        features: [
          'Studio recording 2 cameras',
          'Professional sound & lights',
          '2-3 persons capacity',
          'Full professional editing',
          'Text and music from client',
          'Video duration 10-20 minutes',
          'One final correction included'
        ],
        notIncluded: [],
        isActive: true,
        category: 'podcast-editing',
        isPopular: true,
        sortOrder: 3,
      },
    }),
    // Studio Rental
    prisma.servicePackage.create({
      data: {
        name: 'Rent Studio Space',
        slug: 'studio-rental',
        description: 'Rent studio space for personal production',
        price: 200,
        originalPrice: 300,
        duration: 1,
        features: [
          'Full studio access',
          'Use for personal production',
          'Flexible booking hours',
          'Professional environment'
        ],
        notIncluded: [
          'Equipment rental',
          'Editing services',
          'Engineer assistance'
        ],
        isActive: true,
        category: 'studio-rental',
        sortOrder: 4,
      },
    }),
    // Professional Reels
    prisma.servicePackage.create({
      data: {
        name: 'Professional Reels',
        slug: 'professional-reels',
        description: 'Video record for short reels with editing',
        price: 250,
        duration: 1,
        features: [
          'Video record for short reels',
          'Editing and titles included',
          'No effects',
          'Social media ready'
        ],
        notIncluded: [],
        isActive: true,
        category: 'reels',
        sortOrder: 5,
      },
    }),
    // 10 Reels Package
    prisma.servicePackage.create({
      data: {
        name: '10 Reels Package',
        slug: '10-reels-package',
        description: 'One-hour video recording with 10 edited reels',
        price: 2900,
        duration: 1,
        features: [
          'One-hour video recording',
          'Studio + professional lights',
          '10 edited reels included',
          'Editing and titles',
          'No effects',
          '290 AED per reel'
        ],
        notIncluded: [],
        isActive: true,
        category: 'reels',
        sortOrder: 6,
      },
    }),
    // Podcast 5 Hours Package
    prisma.servicePackage.create({
      data: {
        name: 'Podcast 5 Hours Package',
        slug: 'podcast-5-hours',
        description: '5 hours recording with 15 professional reels',
        price: 2700,
        originalPrice: 3800,
        duration: 5,
        features: [
          '5 hours video recording',
          '2-camera setup',
          'Professional lights & clean sound',
          '15 Professional Reels included',
          'Editing, color correction and titles',
          'No effects'
        ],
        notIncluded: [],
        isActive: true,
        category: 'podcast-editing',
        sortOrder: 7,
      },
    }),
    // Podcast 10 Hours Package
    prisma.servicePackage.create({
      data: {
        name: 'Podcast 10 Hours Package',
        slug: 'podcast-10-hours',
        description: '10 hours recording with 30 professional reels',
        price: 2700,
        originalPrice: 3800,
        duration: 10,
        features: [
          '10 hours video recording',
          '2-camera setup',
          'Professional lights & clean sound',
          '30 Professional Reels included',
          'Editing, color correction and titles',
          'Customized studio'
        ],
        notIncluded: [],
        isActive: true,
        category: 'podcast-editing',
        sortOrder: 8,
      },
    }),
  ]);

  console.log(`✅ Created ${servicePackages.length} service packages`);

  // Create Add-On Services
  const addOnServices = await Promise.all([
    prisma.addOnService.create({
      data: {
        name: 'Simple Editing',
        slug: 'simple-editing',
        description: 'Simple editing for video 20-60 seconds',
        price: 90,
        icon: 'Film',
        isActive: true,
      },
    }),
    prisma.addOnService.create({
      data: {
        name: 'Extra Studio Hour',
        slug: 'extra-hour',
        description: 'One hour more shooting time',
        price: 100,
        icon: 'Clock',
        isActive: true,
      },
    }),
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
