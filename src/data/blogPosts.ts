export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string | null;
  readingTime: number;
  publishedAt: string | null;
  category: {
    id: string;
    name: string;
    color: string;
  } | null;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'vibe-coding-drawbacks-developers',
    title: 'Why "Vibe Coding" is Creating Developers Who Can\'t Debug',
    excerpt: 'AI coding assistants are revolutionary, but they\'re creating a generation gap. While Gen Z ships features faster, experienced developers who understand fundamentals remain irreplaceable. Here\'s the uncomfortable truth about over-reliance on AI tools.',
    content: `
The rise of AI coding assistants like GitHub Copilot, Cursor, and ChatGPT has fundamentally changed how we write code. A developer who once spent hours debugging a tricky algorithm can now ask an AI and get a working solution in seconds. It's magical. It's transformative. And it's creating a dangerous skill gap.

## The Vibe Coding Phenomenon

"Vibe coding" is what happens when developers rely entirely on AI suggestions without understanding the underlying code. They're not reading documentation, not understanding algorithms, not learning why something works—they're just vibing with whatever the AI spits out. If it runs, ship it.

The problem isn't the AI. The problem is treating it like a magic black box instead of a powerful tool that still requires human expertise to use effectively.

## The Generation Gap

Here's what's happening: Junior developers are shipping features faster than ever. They're productive from day one. They can build full-stack applications without touching a single piece of documentation. Impressive, right?

Until something breaks.

When that AI-generated authentication flow has a security vulnerability, or that database query starts timing out at scale, these developers are lost. They never learned to read stack traces. They never learned to profile code. They never learned to debug.

## Why Experience Still Matters

Experienced developers who understand fundamentals can use AI to amplify their abilities. They know when the AI is wrong. They can spot inefficient code. They understand the trade-offs.

A junior developer using AI is like someone using Google Translate to write a novel in a foreign language. Sure, the words might be correct, but the nuance, the structure, the deeper understanding—it's all missing.

## The Uncomfortable Truth

AI coding assistants are not going away. They're getting better. But they're not a replacement for understanding how to code—they're a multiplier for those who already know how.

The developers who thrive in the AI era won't be those who can prompt-engineer the best code snippets. They'll be the ones who understand the fundamentals deeply enough to know when to use AI, when to ignore it, and when to fix what it gets wrong.

## The Path Forward

If you're relying on AI for everything, stop. Start reading the code it generates. Understand why it works. Learn to debug without asking ChatGPT what's wrong. Build things from scratch occasionally just to prove you still can.

Because the moment your AI assistant fails you, the only thing standing between you and a production disaster is your fundamental understanding of how code actually works.

And "vibes" won't debug a memory leak.
`,
    featuredImage: '/images/studio-portfolio-1.jpg',
    readingTime: 8,
    publishedAt: '2025-01-15',
    category: {
      id: '1',
      name: 'Tech & Development',
      color: '#A8D646',
    },
  },
  {
    id: '2',
    slug: 'dubai-real-estate-podcast-saturation',
    title: 'The Real Estate Podcast Paradox: Everyone\'s an Expert, Nobody\'s Listening',
    excerpt: 'Dubai\'s real estate boom has spawned thousands of property podcasts. But in a market saturated with "experts," how do you cut through the noise? We explore why authenticity beats production value every single time.',
    content: `
Dubai's real estate market is booming, and so is the number of people talking about it. Every property agent, investor, and enthusiast has launched a podcast. The problem? Nobody's listening.

## The Saturation Problem

Search for "Dubai real estate podcast" and you'll find hundreds of shows. Most feature the same guests, discuss the same topics, and offer the same generic advice. Buy in Dubai Marina. Invest in off-plan. The market is strong.

It's content created for content's sake, not because there's something new to say.

## Production Value vs. Substance

Here's the trap: Many hosts think better production equals better podcast. They invest in expensive microphones, professional studios, polished editing. The result? Beautifully produced episodes that say absolutely nothing.

Your audience doesn't care about your audio quality if your insights are recycled LinkedIn posts. They'd rather listen to a genuine expert on a laptop microphone than a salesperson in a recording studio.

## What Actually Works

The podcasts that cut through the noise share one quality: authenticity. They're not trying to be the next big thing. They're sharing real experiences, real deals, real failures.

They interview people who aren't selling anything. They discuss topics others avoid. They admit when they don't know something. And their audience grows organically because people can tell the difference between content and conversation.

## The Path Forward

If you're starting a real estate podcast in Dubai, ask yourself: What am I saying that nobody else is? If the answer is "nothing," don't start. The market doesn't need another generic property show.

But if you have genuine insights, unique access, or a perspective others are missing, then production quality doesn't matter. Your content will speak for itself.

Authenticity beats production value every single time.
`,
    featuredImage: '/images/studio-portfolio-2.jpg',
    readingTime: 6,
    publishedAt: '2025-01-10',
    category: {
      id: '2',
      name: 'Real Estate',
      color: '#FF6B6B',
    },
  },
  {
    id: '3',
    slug: 'algorithm-chasing-killed-creativity',
    title: 'Algorithm Chasing Killed Your Content (And Your Audience Knows)',
    excerpt: 'Hook-obsessed creators are producing emotionless content designed for algorithms, not humans. The metrics look good, but engagement is hollow. Why returning to authentic storytelling is the only way forward in 2025.',
    content: `
Every creator knows the formula. Hook in 3 seconds. Jump cuts every 2 seconds. Text overlays. Trending audio. Upload at optimal times. A/B test everything.

The metrics look great. Views are up. Engagement is… hollow.

## The Algorithm Optimization Trap

Somewhere along the way, we forgot that content is for people, not algorithms. We stopped asking "Is this valuable?" and started asking "Will this perform?"

The result is an internet full of perfectly optimized garbage. Content that hooks you in 3 seconds and wastes the next 3 minutes. Videos designed to be watched, not remembered. Posts crafted for clicks, not connection.

## What We Lost

When you optimize for algorithms, you lose the thing that made your content worth creating in the first place: Your voice. Your perspective. Your ability to say something only you can say.

Algorithm-chasing creators all sound the same. Same cadence. Same structure. Same empty hooks. They've optimized away everything interesting.

## The Engagement Illusion

Here's the uncomfortable truth: High view counts don't mean people care. They mean you gamed the algorithm successfully. But your audience can tell the difference.

They watch because the algorithm put you in front of them, not because they were looking for you. They don't remember your name. They won't seek out your next video. They're not actually engaged—they're just not scrolling past fast enough.

## The Return to Storytelling

The creators who will thrive in 2025 aren't the ones who understand algorithms. They're the ones who understand humans. They know that genuine stories connect deeper than viral hooks ever will.

They're willing to let a video "underperform" if it means saying something true. They measure success in impact, not impressions.

## The Choice

You can keep chasing the algorithm. Polish every second. Optimize every frame. Watch your metrics soar while your creative soul dies.

Or you can make content that matters. Content only you can make. Content that won't always go viral but will actually resonate with the people who find it.

The algorithm will always change. Authenticity won't.
`,
    featuredImage: '/images/studio-portfolio-3.jpg',
    readingTime: 7,
    publishedAt: '2025-01-05',
    category: {
      id: '3',
      name: 'Content Strategy',
      color: '#4ECDC4',
    },
  },
  {
    id: '4',
    slug: 'podcast-monetization-reality-check',
    title: 'The Brutal Truth About Podcast Monetization in 2025',
    excerpt: 'Most podcasters quit before seeing a single dirham. We break down the real numbers behind podcast revenue, why sponsorships aren\'t coming, and the unconventional paths to profitability that actually work.',
    content: `
Let's talk about the elephant in the room: Most podcasts never make money. Not a single dirham. Not one sponsor. Not even enough to cover hosting fees.

Here's why, and what actually works.

## The Sponsorship Myth

Every new podcaster dreams of sponsorships. Get to 10,000 downloads per episode, they say. Brands will line up, they promise. You'll make thousands per episode.

Reality: The threshold for consistent sponsorships isn't 10,000 downloads. It's closer to 50,000. And even then, you're competing with established shows that already have relationships with brands.

Most podcasters quit before they hit 500 downloads per episode.

## The Real Numbers

Let's break down what podcast monetization actually looks like for most creators:

Sponsorships? Not unless you're in the top 1% of shows. Listener support? Maybe 0.1% of your audience will donate. Affiliate revenue? Minimal unless you're in a high-ticket niche.

The harsh reality is that podcasting is a terrible business model if your only goal is making money from ad revenue.

## What Actually Works

The podcasters making money aren't doing it from sponsorships. They're using podcasting as a funnel for something else:

Consulting services. Course sales. Building an audience for their main business. Personal brand development. Speaking opportunities.

The podcast isn't the business. It's the marketing channel.

## The Unconventional Path

Some podcasters monetize through:

Premium memberships with exclusive content. Paid workshops based on podcast topics. Live events and recordings. Selling the methodology they discuss on the show.

These approaches work because they're not dependent on massive download numbers. 1,000 true fans who pay 100 AED per year beats 100,000 listeners who cost you money to serve.

## The Bottom Line

If you're starting a podcast purely to make money from ads, stop. You'll burn out before you monetize.

But if you're building an audience for something else you sell, or creating something valuable enough that people will pay for deeper access, podcasting can be incredibly profitable.

Just not in the way you probably thought.
`,
    featuredImage: '/images/studio-portfolio-4.jpg',
    readingTime: 10,
    publishedAt: '2025-01-02',
    category: {
      id: '4',
      name: 'Business',
      color: '#FFA500',
    },
  },
  {
    id: '5',
    slug: 'uae-content-creator-economy',
    title: 'UAE Content Creator Economy: Who\'s Actually Making Money?',
    excerpt: 'Behind the glamorous Instagram posts lies a harsh reality. We investigate the UAE creator economy, from viral TikTokers to established podcasters, separating sustainable businesses from those burning investor cash.',
    content: `
The UAE content creator economy looks thriving from the outside. Influencer events. Brand partnerships. Lifestyle shots in Dubai Marina. Everyone seems to be making it.

But behind the Instagram facade, most creators are barely breaking even.

## The Visibility Bias

Social media creates an illusion. You see the 1% who made it posting about brand deals and luxury lifestyles. You don't see the 99% struggling to convert followers into revenue.

This creates a false picture of what's actually sustainable in the creator economy. Most of what looks like success is actually venture-backed startups burning cash, or creators funding their lifestyle through other means.

## Who's Really Making Money

After investigating the UAE creator landscape, here's who's actually profitable:

Niche B2B creators serving specific industries. Educators selling courses to professionals. Consultants using content for lead generation. E-commerce brands using content to sell products.

Notice what's missing? Pure content creators living off brand deals and ad revenue.

## The Sponsored Post Trap

A creator with 100,000 followers might charge 5,000 AED for a sponsored post. Sounds great until you realize:

They post maybe 10-12 sponsored posts per year (brands don't want pure sponsored feeds). That's 50,000-60,000 AED annually. Before costs. Before taxes. Before the algorithm changes and their reach dies.

It's not a sustainable business model.

## What Actually Works

The creators making real money in the UAE aren't selling attention. They're selling:

Expertise (consulting, coaching, courses). Products (physical or digital). Access (communities, masterminds, exclusive content). Services (production, strategy, talent management).

Content is their marketing, not their revenue model.

## The Path to Sustainability

If you want to make real money as a creator in the UAE, build a business that content supports, not a business that is content.

Create value beyond entertainment. Solve expensive problems. Build an audience that will pay for solutions, not just follow for free content.

The glamorous lifestyle posts are for show. The real creator economy is far less photogenic but far more profitable.
`,
    featuredImage: '/images/studio-portfolio-6.jpg',
    readingTime: 9,
    publishedAt: '2024-12-28',
    category: {
      id: '3',
      name: 'Content Strategy',
      color: '#4ECDC4',
    },
  },
  {
    id: '6',
    slug: 'video-podcast-vs-audio-only',
    title: 'Video Podcasts Are Killing Audio-Only Shows (And That\'s Not Good)',
    excerpt: 'YouTube is forcing every podcaster into video production. But at what cost? We explore why the shift to video is creating content that looks great but says nothing, and why audio-first might still be the smarter bet.',
    content: `
YouTube's podcast push has created a new mandate: If you're not doing video, you're invisible. Spotify is doubling down on video. Everyone's rushing to add cameras.

But in the race to add video, we're losing what made podcasts special in the first place.

## The Video Production Trap

Adding video doesn't just mean "turn on a camera." It means:

Lighting setup. Multiple cameras. Editing video timelines. Thumbnail creation. YouTube SEO. Visual pacing. Making sure you look presentable for 2-hour recordings.

The cognitive load of video production fundamentally changes the content. You're no longer having a conversation. You're performing for a camera.

## The Content Quality Shift

Audio-first podcasts can dive deep. They can ramble. They can explore tangents. The listener is along for the journey because they're doing something else—commuting, working out, cooking.

Video podcasts need to be watchable. That means tighter edits. More visual stimulus. Less depth. The best insights often happen in the messy, unscripted moments that video audiences scroll past.

## The Discovery Paradox

Yes, YouTube is better for discovery than audio platforms. But the content that performs on YouTube isn't the same content that creates devoted podcast listeners.

YouTube rewards clips, highlights, and viral moments. Audio podcasts reward depth, consistency, and trust. These are fundamentally different content strategies.

## When Video Works

Video makes sense if:

Your content is inherently visual (product demos, tutorials, physical demonstrations). You're building a personal brand where you are the product. You have the production resources to do video well.

But if your value is in the depth of conversation, forcing it into video format might actually diminish what made it valuable.

## The Audio-First Bet

Some of the fastest-growing podcasts in 2025 are audio-only. They're doubling down on what video can't compete with: Depth. Length. Intimacy. The freedom to think out loud without worrying about how it looks.

They're smaller audiences, but more engaged. Less discoverable, but more loyal. And crucially, far less expensive to produce.

## The Choice

Video isn't inherently bad. But it's also not inherently necessary. If your content's value is in the conversation, not the presentation, audio-first might still be the smarter bet.

Just because everyone's rushing to video doesn't mean you should follow.
`,
    featuredImage: '/images/studio-hero-1.jpg',
    readingTime: 7,
    publishedAt: '2024-12-22',
    category: {
      id: '3',
      name: 'Content Strategy',
      color: '#4ECDC4',
    },
  },
  {
    id: '7',
    slug: 'remote-work-myth-productivity',
    title: 'The Remote Work Productivity Myth Nobody Talks About',
    excerpt: 'Remote work evangelists sold us a dream of peak productivity. Five years later, the cracks are showing. Burnout is up, collaboration is down, and companies are quietly walking back their "remote-first" promises.',
    content: `
In 2020, remote work was the future. By 2025, companies are quietly mandating returns to office. What happened to the productivity paradise we were promised?

## The Productivity Illusion

The data showed remote workers were more productive. More hours logged. More tickets closed. More emails sent. Productivity was up!

Except we were measuring the wrong things. We counted activity, not impact. We tracked time, not results. We optimized for looking busy, not being effective.

Actual productivity? Down for most knowledge work that requires creativity and collaboration.

## The Collaboration Cost

Remote work evangelists promised seamless digital collaboration. The reality: Zoom fatigue, endless Slack messages, and the death of spontaneous innovation.

The casual hallway conversation that sparked an idea doesn't happen on Slack. The quick 5-minute check-in becomes a scheduled 30-minute call. The energy of in-person brainstorming can't be replicated in a Brady Bunch grid.

## The Burnout Epidemic

Remote work removed the boundary between work and life. Now you're always available. Always online. Always one Slack notification away from work mode.

The result? Productivity might look high in the short term, but burnout is crushing long-term performance. People are working more hours and getting less meaningful work done.

## The Silent Return

Companies won't say it publicly, but they're pulling back on remote-first policies. "Hybrid" is code for "we want you back but can't say it outright." The full-remote job market is shrinking faster than the evangelists want to admit.

Why? Because after years of remote work, companies have real data. And it shows that for most roles, some in-person time matters.

## What Actually Works

The future isn't fully remote or fully office. It's intentional about when each makes sense.

Deep focus work? Remote is better. Complex problem-solving? In person wins. Routine tasks? Remote. Building relationships? In person. Learning something new? In person. Executing what you already know? Remote.

## The Honest Truth

Remote work is amazing for individual contributor roles doing well-defined work. It's terrible for collaboration-heavy, creative, or learning-intensive work.

The productivity paradise we were promised assumed all work is the same. It's not. And pretending otherwise doesn't help anyone.

The remote work revolution happened. Now comes the correction. Not back to 2019, but forward to something more nuanced than "remote forever" or "office always."

The companies that figure this out will win the talent war. The ones still fighting the ideological battle will lose good people on both sides.
`,
    featuredImage: '/images/studio-hero-2.jpg',
    readingTime: 8,
    publishedAt: '2024-12-18',
    category: {
      id: '1',
      name: 'Tech & Development',
      color: '#A8D646',
    },
  },
  {
    id: '8',
    slug: 'dubai-startup-funding-winter',
    title: 'Dubai Startup Funding Reality: The Party\'s Over',
    excerpt: 'The easy money era is done. Dubai startups that raised millions are now scrambling for profitability. We examine which sectors are still getting funded, who\'s quietly shutting down, and what this means for 2025.',
    content: `
The Dubai startup scene looked unstoppable in 2022. Funding was flowing. Valuations were soaring. Everyone had a pitch deck and a dream.

Two years later, the music stopped. And most dancers haven't noticed yet.

## The Funding Reality

In 2022, a decent pitch and some traction could land you a 2-3 million dollar seed round in Dubai. In 2025, the same company struggles to raise 500K.

What changed? The free money era ended. Interest rates went up. VCs got burned on companies that spent big without finding product-market fit. The bar for funding went from "interesting idea" to "proven business model."

## Who's Still Getting Funded

The sectors still seeing investment:

Deep tech with defensible IP. B2B SaaS with proven unit economics. Healthcare and fintech solving expensive problems. Logistics and supply chain optimization.

What's not getting funded: Consumer apps burning cash for growth. Marketplaces without network effects. "Uber for X" ideas. Lifestyle businesses masquerading as startups.

## The Quiet Shutdowns

Most startups that raised in 2021-2022 are now in one of three categories:

Desperately cutting burn to extend runway. Scrambling to show profitability to raise the next round. Quietly shutting down while founders save face with "pivots" and "strategic changes."

You won't see TechCrunch articles about these failures. You'll see LinkedIn posts about "new opportunities" and "learning experiences."

## The Path to Funding in 2025

If you want to raise money in Dubai's new reality:

Show profitability or a clear path to it. Prove unit economics that work at scale. Demonstrate capital efficiency. Build something defensible.

The era of funding stories and potential is over. Now you need numbers and proof.

## What This Means for Founders

If you're building a startup in Dubai, don't rely on raising capital. Build a business that can survive without it. If funding comes, great. If it doesn't, you're still building something sustainable.

The companies that will thrive in 2025 aren't the ones with the best pitch decks. They're the ones solving real problems profitably.

The easy money party is over. The real work begins now.
`,
    featuredImage: '/images/studio-hero-3.jpg',
    readingTime: 11,
    publishedAt: '2024-12-15',
    category: {
      id: '4',
      name: 'Business',
      color: '#FFA500',
    },
  },
  {
    id: '9',
    slug: 'ai-replacing-creative-jobs',
    title: 'AI Isn\'t Replacing Creatives - It\'s Exposing Who Was Never Creative',
    excerpt: 'The AI panic in creative industries reveals an uncomfortable truth: many "creative" roles were always assembly-line work. Real creativity was rare then, and it\'s still rare now. The difference? AI is faster at the assembly line.',
    content: `
Every creative industry is panicking about AI. Designers fear Midjourney. Writers fear ChatGPT. Artists fear Stable Diffusion.

But here's the uncomfortable truth: AI isn't replacing creativity. It's exposing how little creativity most "creative" work actually involved.

## The Assembly Line Reality

Most design work isn't creative. It's applying established patterns to slightly different contexts. Logo variations. Social media templates. Presentation decks that look like every other presentation deck.

Most writing isn't creative. It's following formulas. SEO articles. Product descriptions. Email copy optimized for clicks.

Most creative roles were always assembly-line work. We just called it creative because it involved design software and artistic tools.

## What AI Exposed

AI is exceptionally good at pattern recognition and recombination. That's exactly what most "creative" work was: Recognizing patterns, recombining elements, following templates.

The designers who are losing work to AI weren't creating. They were applying templates. The writers being replaced weren't crafting prose. They were filling in Mad Libs.

Real creativity—the ability to see what doesn't exist and bring it into being—that's still rare. And AI can't do it.

## The Creativity Gap

AI can make a logo that looks like other logos. It can't create a brand identity that captures something intangible about a company's culture.

AI can write an article that reads like other articles. It can't write something that makes you see the world differently.

AI can generate images that look like other images. It can't create art that moves you for reasons you can't articulate.

## Who Survives

The creatives who survive the AI era aren't the ones with the best technical skills. They're the ones with genuine creative vision.

They can articulate why this specific choice matters. They understand the strategic thinking behind creative decisions. They see connections others don't. They create work that couldn't exist without their specific perspective.

## The Silver Lining

AI democratizing assembly-line creative work is actually good for real creatives. It clears out the noise. It raises the bar. It forces us to ask: Are we really creating something new, or just rearranging what already exists?

The creative industry is about to get more honest. The assembly-line workers will find new careers (many using AI tools, ironically). The real creatives will finally be valued for what they actually bring: Original thinking.

## The Test

If AI can do your job, you never had a creative job. You had a pattern-matching job that happened to use creative tools.

Real creativity can't be automated because it's not about following patterns. It's about breaking them intentionally.

The AI panic in creative industries isn't about AI getting too good at creativity. It's about us realizing how little creativity most creative work actually required.
`,
    featuredImage: '/images/studio-hero-7.jpg',
    readingTime: 9,
    publishedAt: '2024-12-10',
    category: {
      id: '1',
      name: 'Tech & Development',
      color: '#A8D646',
    },
  },
  {
    id: '10',
    slug: 'personal-branding-vs-privacy',
    title: 'The Personal Branding Trap: You\'re Not a Product, Stop Selling Yourself',
    excerpt: 'LinkedIn influencers and personal branding gurus have convinced everyone to perform their entire life online. But constant self-promotion comes at a psychological cost nobody discusses. When does authenticity become exploitation?',
    content: `
LinkedIn is full of personal branding advice. Share your journey. Document your process. Be vulnerable. Be authentic. Build your personal brand.

Everyone's a brand now. Everyone's a product. Everyone's always selling.

And it's making us miserable.

## The Performance Trap

Personal branding sounds empowering. Take control of your narrative. Shape how people see you. Build your reputation.

But in practice, it means performing your life for an audience. Every experience becomes content. Every failure becomes a "lesson learned" post. Every success becomes a humble-brag disguised as inspiration.

You're not living. You're curating a highlight reel for strangers.

## The Authenticity Paradox

Personal branding gurus preach authenticity. Be yourself! Show vulnerability! Let people see the real you!

Except it's not real. Real vulnerability isn't strategic. Real authenticity doesn't have a call-to-action. Real life doesn't fit into LinkedIn's character limit with three bullet points and a question at the end to boost engagement.

The moment you perform authenticity for an audience, it stops being authentic.

## The Psychological Cost

Constant self-promotion rewires your brain. You stop asking "Is this meaningful?" and start asking "Is this shareable?"

Every conversation becomes a potential post. Every setback becomes content. You can't experience anything without wondering how it will land on social media.

The psychological term for this is "self-objectification." You're turning yourself into a product to be marketed. And it's exhausting.

## When It Goes Too Far

Personal branding crosses a line when:

You can't separate your identity from your online persona. You feel anxious when not posting regularly. You measure your self-worth in likes and comments. You overshare to maintain "authenticity." You can't have experiences without documenting them.

At that point, you're not building a personal brand. You're losing yourself to one.

## The Alternative

What if you just... did good work? What if your reputation was built on results, not posts? What if you let your work speak for itself instead of constantly narrating it?

Some of the most respected people in every industry have minimal online presence. They're too busy doing the work to perform doing the work.

## The Privacy Rebellion

There's a quiet rebellion happening. High performers deleting LinkedIn. Successful professionals going silent on social media. People realizing that constant visibility isn't required for success.

Your personal brand doesn't need to be public. It can exist in the quality of your work, the trust of your network, and the impact you make without broadcasting it.

## The Bottom Line

You're not a product. You're a person. And people are allowed to have private lives, private struggles, and private successes that aren't packaged for public consumption.

Build your skills. Do good work. Treat people well. Let your reputation form organically from what you actually do, not what you perform online.

The personal branding industrial complex wants you to believe you need a content strategy to succeed. You don't. You need competence, integrity, and the courage to live a life that isn't curated for an audience.

Sometimes the best personal brand is not having one at all.
`,
    featuredImage: '/images/studio-hero-8.jpg',
    readingTime: 10,
    publishedAt: '2024-12-05',
    category: {
      id: '3',
      name: 'Content Strategy',
      color: '#4ECDC4',
    },
  },
];
