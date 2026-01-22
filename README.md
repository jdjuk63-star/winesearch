# 🍷 WineValue+ Dashboard

A beautiful, minimalist wine investment analysis dashboard built with React and Recharts. Track wine values across multiple sources including CultX, WineBid, and K&L Wines.

![Dashboard Preview](https://img.shields.io/badge/React-18.2-blue) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **Multi-Source Tracking** - Aggregate data from CultX, WineBid & K&L Wines
- **Value Scoring** - Proprietary algorithm scores wines 0-100
- **Real-Time Filters** - Filter by region, source, and critic score
- **Visual Analytics** - Price trends, regional distribution charts
- **Responsive Design** - Works on desktop and tablet
- **Modern UI** - White/purple minimalist design

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ installed
- npm or yarn package manager

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/wine-dashboard.git
cd wine-dashboard

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

## 📁 Project Structure

```
wine-dashboard/
├── public/
│   └── wine-icon.svg      # Favicon
├── src/
│   ├── App.jsx            # Main dashboard component
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── package.json           # Dependencies & scripts
├── vite.config.js         # Vite configuration
└── README.md
```

## 🌐 Deploy to Vercel (Recommended)

### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Option 2: CLI Deploy

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Option 3: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repo
5. Click "Deploy"

That's it! Vercel auto-deploys on every push.

## 🎨 Design System

The dashboard uses a **White Purple Minimalist UI/UX** design:

| Element | Color |
|---------|-------|
| Background | `#F3E8FF` (Light Lavender) |
| Primary Purple | `#A855F7` |
| Accent Pink | `#D946EF` |
| Cards | `#FFFFFF` |
| Text Dark | `#1F2937` |
| Success | `#10B981` |

**Font:** Poppins (Google Fonts)

## 📊 Value Scoring Algorithm

Wines are scored on a 0-100 scale based on:

| Factor | Weight |
|--------|--------|
| Price Value (discount) | 30% |
| Quality (critic + producer) | 25% |
| Market Dynamics (liquidity) | 20% |
| Cellar Potential | 15% |
| Timing | 10% |

**Signals:**
- 🟢 **Strong Buy**: Score ≥ 90
- 🟣 **Buy**: Score ≥ 85
- 🟡 **Hold**: Score ≥ 75
- ⚪ **Watch**: Score < 75

## 🔧 Customization

### Add Your Own Wine Data

Edit the `wineData` array in `src/App.jsx`:

```javascript
const wineData = [
  {
    id: 'custom-1',
    source: 'CultX',
    name: 'Your Wine Name',
    vintage: 2020,
    region: 'Piedmont',
    subRegion: 'Barolo',
    producer: 'Producer Name',
    criticScore: 98,
    marketPrice: 500,
    highestBid: 420,
    discount: -16.0,
    liquidityScore: 4,
    priceHistory: [380, 400, 410, 415, 418, 420],
    valueScore: 89,
  },
  // ... more wines
];
```

### Change Colors

Update the `theme` object in `src/App.jsx`:

```javascript
const theme = {
  colors: {
    purple500: '#YOUR_COLOR',
    accent: '#YOUR_ACCENT',
    // ...
  }
};
```

## 📝 License

MIT License - feel free to use for personal or commercial projects.

## 🙏 Credits

- Design inspired by [Envato Elements](https://elements.envato.com) UI/UX templates
- Charts by [Recharts](https://recharts.org)
- Icons from emoji set

---

**Made with 🍷 by WineValue+**
