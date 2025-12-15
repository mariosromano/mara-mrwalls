# Mara - MR Walls Design Assistant

AI-powered design assistant for exploring carved Corian wall surfaces.

## Quick Deploy to Vercel

### Step 1: Push to GitHub
1. Create a new repo on GitHub (e.g., `mara-mrwalls`)
2. Upload all these files to the repo

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign up (free)
2. Click "New Project"
3. Import your GitHub repo
4. Add Environment Variable:
   - Name: `VITE_ANTHROPIC_API_KEY`
   - Value: Your Anthropic API key from console.anthropic.com
5. Click Deploy

### Step 3: Done!
You'll get a URL like `mara-mrwalls.vercel.app`

## Local Development

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env and add your Anthropic API key

# Run dev server
npm run dev
```

## Files Overview

- `src/Mara.jsx` - Main chat component with system prompt and assets
- `src/main.jsx` - React entry point
- `src/index.css` - Tailwind styles

## Adding More Images

Edit `ASSETS` array in `src/Mara.jsx`:

```javascript
{
  id: "new",
  title: "Project Name",
  sector: "Healthcare", // Healthcare, Hospitality, Corporate, Retail, Aviation
  design: "Billow",     // Pattern name
  enhancement: "Backlight", // or "" for none
  thumbnail: "https://res.cloudinary.com/your-url.jpg"
}
```

## Custom Domain

In Vercel dashboard → Settings → Domains → Add `mara.mrwalls.io`
