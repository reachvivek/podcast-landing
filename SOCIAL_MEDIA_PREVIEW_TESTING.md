# Social Media Preview Testing Guide

## What Was Updated

### New Preview Images
- **og-preview.jpg** (1200x630): Landscape format for WhatsApp, Facebook, LinkedIn, Twitter
- **og-square.jpg** (1200x1200): Square format for Instagram and better mobile display

### Meta Tags Added
- Comprehensive Open Graph tags for WhatsApp, Telegram, Facebook, Instagram
- Twitter/X Card optimization
- Secure HTTPS image URLs
- Mobile-specific optimizations
- Theme colors for mobile browsers

## How to Test Previews

### WhatsApp
1. Send your website URL: `https://ecospace.ae`
2. WhatsApp will automatically fetch and show the preview
3. You should see:
   - Title: "EcoSpace - Dubai's Premier Podcast Studio at DWTC"
   - Description: "Professional podcast recording, video production & editing services..."
   - Image: Studio setup photo (1200x630)

**Clear WhatsApp Cache (if needed):**
- Delete the chat
- Send the link again in a new chat

### Telegram
1. Send your website URL in any chat
2. Telegram will generate a preview
3. Expected preview:
   - Title and description
   - Studio image thumbnail
   - Clickable link

**Clear Telegram Cache:**
- Settings → Advanced → Storage and Network → Clear Cache
- Send link again

### Instagram Stories/DMs
1. Share the link via DM or Story
2. Instagram uses Open Graph tags
3. Preview should show the square image (1200x1200)

### Twitter/X
1. Compose a tweet with your URL
2. Twitter will show a large image card
3. Expected: Large image preview with title and description

**Test Twitter Card:**
Visit: https://cards-dev.twitter.com/validator
Enter: https://ecospace.ae

### Facebook/LinkedIn
1. Share the link in a post
2. Both platforms use Open Graph tags
3. Preview: Large image with title and description

**Clear Facebook Cache:**
Visit: https://developers.facebook.com/tools/debug/
Enter your URL and click "Scrape Again"

## Debugging Tools

### Open Graph Debugger
- **Facebook**: https://developers.facebook.com/tools/debug/
- **LinkedIn**: https://www.linkedin.com/post-inspector/
- **Twitter**: https://cards-dev.twitter.com/validator

### Generic OG Preview Testers
- https://www.opengraph.xyz/
- https://metatags.io/
- https://www.bannerbear.com/tools/open-graph-preview/

## Important Notes

### Cache Issues
Social media platforms cache preview images. If you don't see the new image:
1. Use the platform's debug tool to refresh
2. Wait 24-48 hours for automatic cache expiry
3. Add a query parameter to force refresh: `https://ecospace.ae?v=2`

### Image Requirements Met
- ✅ Minimum 1200x630 for landscape (WhatsApp, Facebook, Twitter)
- ✅ Square variant 1200x1200 for Instagram
- ✅ HTTPS URLs (required by WhatsApp)
- ✅ JPEG format (best compatibility)
- ✅ Under 5MB file size

### What Each Platform Shows

| Platform | Image Used | Size Displayed | Cache Duration |
|----------|-----------|----------------|----------------|
| WhatsApp | og-preview.jpg | 1200x630 | 7 days |
| Telegram | og-preview.jpg | Variable | 24 hours |
| Instagram | og-square.jpg | 1200x1200 | 7 days |
| Twitter | og-preview.jpg | 1200x675 | 7 days |
| Facebook | og-preview.jpg | 1200x630 | 30 days |
| LinkedIn | og-preview.jpg | 1200x627 | Unknown |

## Verifying It Works

After deployment, check that these meta tags exist in your HTML:

```bash
curl -s https://ecospace.ae | grep -i "og:image"
```

Expected output should include:
- `og:image` pointing to `/images/og-preview.jpg`
- `og:image:secure_url` with HTTPS URL
- `og:image:width` = 1200
- `og:image:height` = 630

## Quick Test Checklist

- [ ] Build passes without errors
- [ ] Images exist in `/public/images/`
- [ ] Meta tags render in page source
- [ ] WhatsApp preview shows image
- [ ] Telegram preview shows image
- [ ] Instagram preview shows square image
- [ ] Twitter card validator passes
- [ ] Facebook debugger shows correct image

## Troubleshooting

**"No image showing on WhatsApp"**
- Ensure HTTPS in production (required)
- Check image file size < 5MB
- Verify og:image:secure_url is set
- Wait or clear cache

**"Old image still showing"**
- Use Facebook debugger to scrape again
- Add version query param: `?v=2`
- Wait 24-48 hours

**"Telegram not showing preview"**
- Check if link is detected as clickable
- Ensure no URL shorteners interfering
- Try clearing Telegram cache

**"Instagram doesn't show image"**
- Instagram is restrictive with external links
- Only works in DMs and Stories, not posts
- May require Instagram Business account verification
