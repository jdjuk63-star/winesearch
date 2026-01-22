import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// ============================================================================
// WINE DATA
// ============================================================================

const wineData = [
  { id: 'cx-1', source: 'CultX', name: "Giacomo Conterno Barolo Monfortino Riserva", vintage: 2015, region: "Piedmont", subRegion: "Barolo", producer: "Giacomo Conterno", criticScore: 99, marketPrice: 4850, highestBid: 4200, discount: -13.4, liquidityScore: 4, priceHistory: [4200, 4350, 4500, 4600, 4750, 4850], valueScore: 92 },
  { id: 'cx-2', source: 'CultX', name: "Bruno Giacosa Barolo Falletto Riserva", vintage: 2016, region: "Piedmont", subRegion: "Barolo", producer: "Bruno Giacosa", criticScore: 98, marketPrice: 1250, highestBid: 1050, discount: -16.0, liquidityScore: 5, priceHistory: [950, 1000, 1080, 1150, 1200, 1250], valueScore: 88 },
  { id: 'cx-3', source: 'CultX', name: "Gaja Barbaresco Sori Tildin", vintage: 2018, region: "Piedmont", subRegion: "Barbaresco", producer: "Gaja", criticScore: 97, marketPrice: 680, highestBid: 620, discount: -8.8, liquidityScore: 5, priceHistory: [520, 550, 580, 620, 670, 680], valueScore: 85 },
  { id: 'cx-4', source: 'CultX', name: "Château Pétrus", vintage: 2018, region: "Bordeaux", subRegion: "Pomerol", producer: "Château Pétrus", criticScore: 100, marketPrice: 32000, highestBid: 28500, discount: -10.9, liquidityScore: 4, priceHistory: [28000, 29000, 30000, 31000, 31500, 32000], valueScore: 95 },
  { id: 'cx-5', source: 'CultX', name: "Château Margaux", vintage: 2019, region: "Bordeaux", subRegion: "Margaux", producer: "Château Margaux", criticScore: 99, marketPrice: 7500, highestBid: 6800, discount: -9.3, liquidityScore: 5, priceHistory: [6500, 6800, 7000, 7200, 7400, 7500], valueScore: 91 },
  { id: 'cx-6', source: 'CultX', name: "DRC Romanée-Conti Grand Cru", vintage: 2018, region: "Burgundy", subRegion: "Vosne-Romanée", producer: "DRC", criticScore: 100, marketPrice: 185000, highestBid: 168000, discount: -9.2, liquidityScore: 3, priceHistory: [165000, 170000, 175000, 180000, 183000, 185000], valueScore: 91 },
  { id: 'cx-7', source: 'CultX', name: "DRC La Tâche Grand Cru", vintage: 2019, region: "Burgundy", subRegion: "Vosne-Romanée", producer: "DRC", criticScore: 99, marketPrice: 42000, highestBid: 38000, discount: -9.5, liquidityScore: 4, priceHistory: [36000, 38000, 39500, 40500, 41500, 42000], valueScore: 93 },
  { id: 'cx-8', source: 'CultX', name: "Krug Clos du Mesnil", vintage: 2008, region: "Champagne", subRegion: "Côte des Blancs", producer: "Krug", criticScore: 99, marketPrice: 12500, highestBid: 10800, discount: -13.6, liquidityScore: 4, priceHistory: [10500, 11000, 11500, 12000, 12300, 12500], valueScore: 91 },
  { id: 'wb-1', source: 'WineBid', name: "Vietti Barolo Ravera", vintage: 2020, region: "Piedmont", subRegion: "Barolo", producer: "Vietti", criticScore: 97, marketPrice: 160, highestBid: 120, discount: -25.0, liquidityScore: 4, priceHistory: [95, 100, 105, 110, 115, 120], valueScore: 91, auctionEnd: "2026-01-26T19:00:00" },
  { id: 'wb-2', source: 'WineBid', name: "Giuseppe Mascarello Monprivato", vintage: 2020, region: "Piedmont", subRegion: "Barolo", producer: "Giuseppe Mascarello", criticScore: 98, marketPrice: 320, highestBid: 240, discount: -25.0, liquidityScore: 3, priceHistory: [180, 195, 210, 225, 235, 240], valueScore: 93, auctionEnd: "2026-01-26T19:00:00" },
  { id: 'wb-3', source: 'WineBid', name: "Bruno Giacosa Barolo Falletto", vintage: 2018, region: "Piedmont", subRegion: "Barolo", producer: "Bruno Giacosa", criticScore: 96, marketPrice: 280, highestBid: 195, discount: -30.4, liquidityScore: 4, priceHistory: [150, 165, 175, 185, 190, 195], valueScore: 92, auctionEnd: "2026-01-26T19:00:00" },
  { id: 'wb-4', source: 'WineBid', name: "Château Ducru-Beaucaillou", vintage: 2019, region: "Bordeaux", subRegion: "Saint-Julien", producer: "Château Ducru-Beaucaillou", criticScore: 98, marketPrice: 280, highestBid: 210, discount: -25.0, liquidityScore: 3, priceHistory: [165, 175, 188, 198, 205, 210], valueScore: 91, auctionEnd: "2026-01-26T19:00:00" },
  { id: 'wb-5', source: 'WineBid', name: "Dom Pérignon", vintage: 2013, region: "Champagne", subRegion: "Épernay", producer: "Dom Pérignon", criticScore: 96, marketPrice: 280, highestBid: 220, discount: -21.4, liquidityScore: 4, priceHistory: [180, 190, 200, 210, 215, 220], valueScore: 87, auctionEnd: "2026-01-26T19:00:00" },
  { id: 'kl-1', source: 'K&L Wines', name: "Quilceda Creek Cabernet Sauvignon", vintage: 2017, region: "California", subRegion: "Red Mountain", producer: "Quilceda Creek", criticScore: 98, marketPrice: 420, highestBid: 316, discount: -24.8, liquidityScore: 3, priceHistory: [260, 280, 295, 305, 312, 316], valueScore: 91, auctionEnd: "2026-01-21T10:30:00" },
  { id: 'kl-2', source: 'K&L Wines', name: "Screaming Eagle The Flight", vintage: 2015, region: "California", subRegion: "Oakville", producer: "Screaming Eagle", criticScore: 98, marketPrice: 2100, highestBid: 1603, discount: -23.7, liquidityScore: 2, priceHistory: [1350, 1420, 1480, 1540, 1580, 1603], valueScore: 89, auctionEnd: "2026-01-21T10:30:00" },
  { id: 'kl-3', source: 'K&L Wines', name: "Scarecrow Cabernet Sauvignon", vintage: 2019, region: "California", subRegion: "Rutherford", producer: "Scarecrow", criticScore: 99, marketPrice: 950, highestBid: 780, discount: -17.9, liquidityScore: 2, priceHistory: [640, 680, 720, 750, 770, 780], valueScore: 88, auctionEnd: "2026-01-21T10:30:00" },
  { id: 'kl-4', source: 'K&L Wines', name: "Domaine Armand Rousseau Clos St-Jacques", vintage: 2018, region: "Burgundy", subRegion: "Gevrey-Chambertin", producer: "Armand Rousseau", criticScore: 97, marketPrice: 1850, highestBid: 1480, discount: -20.0, liquidityScore: 2, priceHistory: [1200, 1280, 1350, 1410, 1460, 1480], valueScore: 89, auctionEnd: "2026-01-21T10:30:00" },
];

// ============================================================================
// DESIGN SYSTEM - White Purple Minimalist UI/UX
// ============================================================================

const theme = {
  colors: {
    // Primary purple palette
    purple50: '#FAF5FF',
    purple100: '#F3E8FF',
    purple200: '#E9D5FF',
    purple300: '#D8B4FE',
    purple400: '#C084FC',
    purple500: '#A855F7',
    purple600: '#9333EA',
    purple700: '#7C3AED',
    
    // Accent magenta/pink (for + symbols and accents)
    accent: '#D946EF',
    accentLight: '#F0ABFC',
    
    // Backgrounds
    bgPage: '#F3E8FF',      // Light lavender
    bgCard: '#FFFFFF',
    bgHover: '#FAF5FF',
    
    // Text
    textDark: '#1F2937',
    textMedium: '#4B5563',
    textLight: '#9CA3AF',
    textMuted: '#D1D5DB',
    
    // Semantic
    success: '#10B981',
    warning: '#F59E0B',
    
    // Dark mode elements
    dark: '#1F2937',
    darker: '#111827',
  },
  
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
  },
  
  fonts: {
    primary: "'Poppins', 'Inter', system-ui, -apple-system, sans-serif",
  }
};

const regions = ["All Regions", "Piedmont", "Bordeaux", "Burgundy", "Champagne", "California"];
const sources = ["All Sources", "CultX", "WineBid", "K&L Wines"];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const getSignal = (score) => {
  if (score >= 90) return { label: "Strong Buy", color: theme.colors.success };
  if (score >= 85) return { label: "Buy", color: theme.colors.purple600 };
  if (score >= 75) return { label: "Hold", color: theme.colors.warning };
  return { label: "Watch", color: theme.colors.textLight };
};

const formatPrice = (price, source) => {
  if (!price) return '-';
  const currency = source === 'CultX' ? '£' : '$';
  if (price >= 1000) return `${currency}${(price / 1000).toFixed(1)}k`;
  return `${currency}${price.toLocaleString()}`;
};

const getTimeRemaining = (endDate) => {
  if (!endDate) return null;
  const end = new Date(endDate);
  const now = new Date();
  const diff = end - now;
  if (diff <= 0) return "Ended";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  if (days > 0) return `${days}d ${hours}h`;
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${mins}m`;
};

// ============================================================================
// COMPONENTS
// ============================================================================

// Plus Accent Component (key design element from template)
const PlusAccent = ({ size = 16, style = {} }) => (
  <span style={{ 
    color: theme.colors.accent, 
    fontWeight: 700, 
    fontSize: size, 
    marginLeft: 2,
    fontFamily: theme.fonts.primary,
    ...style
  }}>+</span>
);

// Navigation Component
const Navigation = () => (
  <nav style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 40px',
    background: theme.colors.bgCard,
    borderBottom: `1px solid ${theme.colors.purple100}`,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: theme.borderRadius.md,
          background: `linear-gradient(135deg, ${theme.colors.purple500} 0%, ${theme.colors.accent} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{ fontSize: 18 }}>🍷</span>
        </div>
        <span style={{ 
          fontFamily: theme.fonts.primary, 
          fontWeight: 700, 
          fontSize: 18,
          color: theme.colors.textDark 
        }}>
          WineValue
        </span>
        <PlusAccent size={14} />
      </div>
      
      <div style={{ display: 'flex', gap: 24 }}>
        {['Dashboard', 'Analytics', 'Portfolio', 'Alerts'].map((item, i) => (
          <span key={item} style={{
            fontFamily: theme.fonts.primary,
            fontSize: 14,
            fontWeight: i === 0 ? 600 : 400,
            color: i === 0 ? theme.colors.purple600 : theme.colors.textMedium,
            cursor: 'pointer',
            padding: '8px 0',
            borderBottom: i === 0 ? `2px solid ${theme.colors.purple600}` : '2px solid transparent',
          }}>
            {item}
          </span>
        ))}
      </div>
    </div>
    
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <button style={{
        padding: '10px 20px',
        background: theme.colors.purple600,
        color: 'white',
        border: 'none',
        borderRadius: theme.borderRadius.full,
        fontFamily: theme.fonts.primary,
        fontWeight: 600,
        fontSize: 13,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}>
        <span>Sync Data</span>
        <span style={{ fontSize: 16 }}>↻</span>
      </button>
      <div style={{
        width: 40,
        height: 40,
        borderRadius: theme.borderRadius.full,
        background: theme.colors.purple100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}>
        <span style={{ fontSize: 18 }}>👤</span>
      </div>
    </div>
  </nav>
);

// Stat Card Component
const StatCard = ({ number, title, value, subtitle, trend }) => (
  <div style={{
    background: theme.colors.bgCard,
    borderRadius: theme.borderRadius.lg,
    padding: 24,
    boxShadow: theme.shadows.md,
    position: 'relative',
  }}>
    <div style={{
      position: 'absolute',
      top: 16,
      right: 16,
      width: 28,
      height: 28,
      borderRadius: theme.borderRadius.full,
      background: theme.colors.purple100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      fontWeight: 700,
      color: theme.colors.purple600,
      fontFamily: theme.fonts.primary,
    }}>
      {number}
    </div>
    
    <p style={{
      margin: 0,
      fontSize: 12,
      fontWeight: 500,
      color: theme.colors.textLight,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      fontFamily: theme.fonts.primary,
    }}>
      {title}
    </p>
    
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 8 }}>
      <span style={{
        fontSize: 36,
        fontWeight: 700,
        color: theme.colors.textDark,
        fontFamily: theme.fonts.primary,
        letterSpacing: '-0.02em',
      }}>
        {value}
      </span>
      {trend && <PlusAccent size={20} />}
    </div>
    
    {subtitle && (
      <p style={{
        margin: '4px 0 0',
        fontSize: 13,
        color: theme.colors.textLight,
        fontFamily: theme.fonts.primary,
      }}>
        {subtitle}
      </p>
    )}
  </div>
);

// Source Badge Component
const SourceBadge = ({ source }) => {
  const styles = {
    'CultX': { bg: theme.colors.purple100, color: theme.colors.purple700 },
    'WineBid': { bg: '#FCE7F3', color: '#BE185D' },
    'K&L Wines': { bg: '#FEF3C7', color: '#B45309' },
  };
  const s = styles[source] || { bg: theme.colors.purple50, color: theme.colors.textMedium };
  
  return (
    <span style={{
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: theme.borderRadius.full,
      background: s.bg,
      color: s.color,
      fontSize: 11,
      fontWeight: 600,
      fontFamily: theme.fonts.primary,
    }}>
      {source}
    </span>
  );
};

// Liquidity Indicator
const LiquidityIndicator = ({ score }) => (
  <div style={{ display: 'flex', gap: 3 }}>
    {[1, 2, 3, 4, 5].map(i => (
      <div key={i} style={{
        width: 6,
        height: 16,
        borderRadius: 2,
        background: i <= score ? theme.colors.purple500 : theme.colors.purple100,
      }} />
    ))}
  </div>
);

// Mini Sparkline
const Sparkline = ({ data, color = theme.colors.purple500 }) => (
  <ResponsiveContainer width={70} height={28}>
    <LineChart data={data.map((v, i) => ({ v }))}>
      <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} />
    </LineChart>
  </ResponsiveContainer>
);

// Filter Button Component
const FilterButton = ({ label, value, options, onChange, isOpen, onToggle }) => (
  <div style={{ position: 'relative' }}>
    <button
      onClick={onToggle}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 16px',
        background: theme.colors.bgCard,
        border: `1px solid ${isOpen ? theme.colors.purple400 : theme.colors.purple200}`,
        borderRadius: theme.borderRadius.md,
        cursor: 'pointer',
        fontFamily: theme.fonts.primary,
        fontSize: 13,
        fontWeight: 500,
        color: theme.colors.textDark,
        minWidth: 140,
        justifyContent: 'space-between',
        boxShadow: isOpen ? `0 0 0 3px ${theme.colors.purple100}` : 'none',
      }}
    >
      <span>{value}</span>
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
        transition: 'transform 0.2s',
      }}>
        <path d="M1 1L5 5L9 1" stroke={theme.colors.textMedium} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
    
    {isOpen && (
      <>
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={onToggle} />
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0,
          minWidth: '100%',
          background: theme.colors.bgCard,
          border: `1px solid ${theme.colors.purple200}`,
          borderRadius: theme.borderRadius.md,
          boxShadow: theme.shadows.lg,
          zIndex: 50,
          overflow: 'hidden',
        }}>
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => { onChange(opt); onToggle(); }}
              style={{
                display: 'block',
                width: '100%',
                padding: '10px 16px',
                background: opt === value ? theme.colors.purple50 : 'transparent',
                border: 'none',
                borderLeft: opt === value ? `3px solid ${theme.colors.purple500}` : '3px solid transparent',
                textAlign: 'left',
                cursor: 'pointer',
                fontFamily: theme.fonts.primary,
                fontSize: 13,
                fontWeight: opt === value ? 600 : 400,
                color: opt === value ? theme.colors.purple600 : theme.colors.textDark,
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      </>
    )}
  </div>
);

// Top Pick Card
const TopPickCard = ({ wine, rank, onClick, isSelected }) => {
  const signal = getSignal(wine.valueScore);
  
  return (
    <div
      onClick={onClick}
      style={{
        background: theme.colors.bgCard,
        borderRadius: theme.borderRadius.lg,
        padding: 20,
        cursor: 'pointer',
        border: isSelected ? `2px solid ${theme.colors.purple500}` : '2px solid transparent',
        boxShadow: theme.shadows.md,
        transition: 'all 0.2s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: theme.borderRadius.full,
          background: theme.colors.purple100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          fontWeight: 700,
          color: theme.colors.purple600,
          fontFamily: theme.fonts.primary,
        }}>
          {rank}
        </div>
        <SourceBadge source={wine.source} />
      </div>
      
      <h4 style={{
        margin: '0 0 4px',
        fontSize: 14,
        fontWeight: 600,
        color: theme.colors.textDark,
        fontFamily: theme.fonts.primary,
        lineHeight: 1.3,
      }}>
        {wine.name.substring(0, 32)}{wine.name.length > 32 ? '...' : ''}
      </h4>
      
      <p style={{
        margin: '0 0 16px',
        fontSize: 12,
        color: theme.colors.textLight,
        fontFamily: theme.fonts.primary,
      }}>
        {wine.vintage} · {wine.subRegion}
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <p style={{
            margin: 0,
            fontSize: 20,
            fontWeight: 700,
            color: theme.colors.textDark,
            fontFamily: theme.fonts.primary,
          }}>
            {formatPrice(wine.highestBid, wine.source)}
          </p>
          <p style={{
            margin: '2px 0 0',
            fontSize: 12,
            fontWeight: 600,
            color: theme.colors.success,
            fontFamily: theme.fonts.primary,
          }}>
            {wine.discount}% below market
          </p>
        </div>
        
        <div style={{
          width: 44,
          height: 44,
          borderRadius: theme.borderRadius.md,
          background: wine.valueScore >= 90 ? `${theme.colors.success}15` : `${theme.colors.purple500}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 16,
          fontWeight: 700,
          color: wine.valueScore >= 90 ? theme.colors.success : theme.colors.purple600,
          fontFamily: theme.fonts.primary,
        }}>
          {wine.valueScore}
        </div>
      </div>
    </div>
  );
};

// Wine Table Row
const WineRow = ({ wine, onClick, isSelected }) => {
  const signal = getSignal(wine.valueScore);
  const trendUp = wine.priceHistory[5] > wine.priceHistory[0];
  
  return (
    <tr
      onClick={onClick}
      style={{
        background: isSelected ? theme.colors.purple50 : 'transparent',
        cursor: 'pointer',
        borderBottom: `1px solid ${theme.colors.purple100}`,
        transition: 'background 0.15s',
      }}
    >
      <td style={{ padding: '14px 12px' }}>
        <SourceBadge source={wine.source} />
      </td>
      <td style={{ padding: '14px 12px' }}>
        <div style={{ fontFamily: theme.fonts.primary, fontSize: 13, fontWeight: 600, color: theme.colors.textDark }}>
          {wine.name.substring(0, 35)}{wine.name.length > 35 ? '...' : ''}
        </div>
        <div style={{ fontFamily: theme.fonts.primary, fontSize: 11, color: theme.colors.textLight, marginTop: 2 }}>
          {wine.producer}
        </div>
      </td>
      <td style={{ padding: '14px 12px', textAlign: 'center' }}>
        <span style={{
          display: 'inline-block',
          padding: '4px 10px',
          borderRadius: theme.borderRadius.sm,
          background: theme.colors.purple50,
          color: theme.colors.purple600,
          fontSize: 11,
          fontWeight: 500,
          fontFamily: theme.fonts.primary,
        }}>
          {wine.subRegion}
        </span>
      </td>
      <td style={{ padding: '14px 12px', textAlign: 'center', fontFamily: theme.fonts.primary, fontSize: 13, fontWeight: 500 }}>
        {wine.vintage}
      </td>
      <td style={{ padding: '14px 12px', textAlign: 'center' }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          borderRadius: theme.borderRadius.sm,
          background: wine.criticScore >= 98 ? '#FEF3C7' : theme.colors.purple50,
          color: wine.criticScore >= 98 ? '#B45309' : theme.colors.textDark,
          fontSize: 12,
          fontWeight: 700,
          fontFamily: theme.fonts.primary,
        }}>
          {wine.criticScore}
        </span>
      </td>
      <td style={{ padding: '14px 12px', textAlign: 'right', fontFamily: theme.fonts.primary, fontSize: 13, fontWeight: 600 }}>
        {formatPrice(wine.highestBid || wine.marketPrice, wine.source)}
      </td>
      <td style={{ padding: '14px 12px', textAlign: 'center' }}>
        <span style={{
          fontFamily: theme.fonts.primary,
          fontSize: 12,
          fontWeight: 600,
          color: wine.discount <= -20 ? theme.colors.success : wine.discount <= -10 ? theme.colors.purple600 : theme.colors.textMedium,
        }}>
          {wine.discount}%
        </span>
      </td>
      <td style={{ padding: '14px 12px', textAlign: 'center' }}>
        <LiquidityIndicator score={wine.liquidityScore} />
      </td>
      <td style={{ padding: '14px 12px' }}>
        <Sparkline data={wine.priceHistory} color={trendUp ? theme.colors.success : theme.colors.accent} />
      </td>
      <td style={{ padding: '14px 12px', textAlign: 'center' }}>
        <span style={{
          fontSize: 16,
          fontWeight: 700,
          color: wine.valueScore >= 90 ? theme.colors.success : theme.colors.purple600,
          fontFamily: theme.fonts.primary,
        }}>
          {wine.valueScore}
        </span>
      </td>
      <td style={{ padding: '14px 12px', textAlign: 'center' }}>
        <span style={{
          display: 'inline-block',
          padding: '6px 12px',
          borderRadius: theme.borderRadius.full,
          background: wine.valueScore >= 90 ? `${theme.colors.success}15` : `${theme.colors.purple500}15`,
          color: signal.color,
          fontSize: 10,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.03em',
          fontFamily: theme.fonts.primary,
        }}>
          {signal.label}
        </span>
      </td>
    </tr>
  );
};

// ============================================================================
// MAIN DASHBOARD
// ============================================================================

export default function WineValueDashboard() {
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedSource, setSelectedSource] = useState("All Sources");
  const [minScore, setMinScore] = useState(85);
  const [selectedWine, setSelectedWine] = useState(null);
  const [openFilter, setOpenFilter] = useState(null);

  const filteredWines = useMemo(() => {
    return wineData
      .filter(w => selectedRegion === "All Regions" || w.region === selectedRegion)
      .filter(w => selectedSource === "All Sources" || w.source === selectedSource)
      .filter(w => w.criticScore >= minScore)
      .sort((a, b) => b.valueScore - a.valueScore);
  }, [selectedRegion, selectedSource, minScore]);

  const stats = useMemo(() => ({
    total: filteredWines.length,
    strongBuys: filteredWines.filter(w => w.valueScore >= 90).length,
    avgDiscount: filteredWines.length ? (filteredWines.reduce((a, b) => a + b.discount, 0) / filteredWines.length).toFixed(1) : 0,
    activeAuctions: filteredWines.filter(w => w.auctionEnd).length,
  }), [filteredWines]);

  const topPicks = filteredWines.filter(w => w.valueScore >= 88).slice(0, 4);

  const regionData = useMemo(() => {
    const data = {};
    filteredWines.forEach(w => {
      if (!data[w.region]) data[w.region] = { count: 0, totalScore: 0 };
      data[w.region].count++;
      data[w.region].totalScore += w.valueScore;
    });
    return Object.entries(data).map(([name, d]) => ({
      name: name.substring(0, 10),
      wines: d.count,
      avgScore: Math.round(d.totalScore / d.count)
    }));
  }, [filteredWines]);

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.colors.bgPage,
      fontFamily: theme.fonts.primary,
    }}>
      <Navigation />
      
      <main style={{ padding: '32px 40px' }}>
        {/* Page Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <h1 style={{
              margin: 0,
              fontSize: 28,
              fontWeight: 700,
              color: theme.colors.textDark,
              fontFamily: theme.fonts.primary,
            }}>
              Investment Dashboard
            </h1>
            <PlusAccent size={20} />
          </div>
          <p style={{
            margin: 0,
            fontSize: 14,
            color: theme.colors.textLight,
            fontFamily: theme.fonts.primary,
          }}>
            Multi-source wine value analysis and opportunity tracking
          </p>
        </div>

        {/* Filters Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 24,
          padding: '16px 20px',
          background: theme.colors.bgCard,
          borderRadius: theme.borderRadius.lg,
          boxShadow: theme.shadows.sm,
        }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: theme.colors.textMedium, fontFamily: theme.fonts.primary }}>
            Filters:
          </span>
          <FilterButton
            value={selectedRegion}
            options={regions}
            onChange={setSelectedRegion}
            isOpen={openFilter === 'region'}
            onToggle={() => setOpenFilter(openFilter === 'region' ? null : 'region')}
          />
          <FilterButton
            value={selectedSource}
            options={sources}
            onChange={setSelectedSource}
            isOpen={openFilter === 'source'}
            onToggle={() => setOpenFilter(openFilter === 'source' ? null : 'source')}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 'auto' }}>
            <span style={{ fontSize: 13, color: theme.colors.textMedium, fontFamily: theme.fonts.primary }}>
              Min Critic Score:
            </span>
            <input
              type="range"
              min={85}
              max={99}
              value={minScore}
              onChange={e => setMinScore(Number(e.target.value))}
              style={{ width: 100, accentColor: theme.colors.purple500 }}
            />
            <span style={{
              fontSize: 14,
              fontWeight: 700,
              color: theme.colors.purple600,
              fontFamily: theme.fonts.primary,
              minWidth: 24,
            }}>
              {minScore}
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32 }}>
          <StatCard number="01" title="Total Wines" value={stats.total} subtitle="Matching filters" />
          <StatCard number="02" title="Strong Buys" value={stats.strongBuys} subtitle="Score 90+" trend />
          <StatCard number="03" title="Avg Discount" value={`${stats.avgDiscount}%`} subtitle="Below market value" />
          <StatCard number="04" title="Active Auctions" value={stats.activeAuctions} subtitle="Ending soon" />
        </div>

        {/* Top Picks & Region Chart */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 32 }}>
          {/* Top Picks Section */}
          <div style={{
            background: theme.colors.bgCard,
            borderRadius: theme.borderRadius.lg,
            padding: 24,
            boxShadow: theme.shadows.md,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <h2 style={{
                margin: 0,
                fontSize: 16,
                fontWeight: 700,
                color: theme.colors.textDark,
                fontFamily: theme.fonts.primary,
              }}>
                Top Value Picks
              </h2>
              <PlusAccent size={14} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {topPicks.map((wine, i) => (
                <TopPickCard
                  key={wine.id}
                  wine={wine}
                  rank={String(i + 1).padStart(2, '0')}
                  onClick={() => setSelectedWine(selectedWine?.id === wine.id ? null : wine)}
                  isSelected={selectedWine?.id === wine.id}
                />
              ))}
            </div>
          </div>

          {/* Region Chart */}
          <div style={{
            background: theme.colors.bgCard,
            borderRadius: theme.borderRadius.lg,
            padding: 24,
            boxShadow: theme.shadows.md,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <h2 style={{
                margin: 0,
                fontSize: 16,
                fontWeight: 700,
                color: theme.colors.textDark,
                fontFamily: theme.fonts.primary,
              }}>
                By Region
              </h2>
              <PlusAccent size={14} />
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={regionData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: theme.colors.textMedium, fontSize: 11, fontFamily: theme.fonts.primary }}
                  width={75}
                />
                <Tooltip
                  contentStyle={{
                    background: theme.colors.bgCard,
                    border: `1px solid ${theme.colors.purple200}`,
                    borderRadius: theme.borderRadius.md,
                    boxShadow: theme.shadows.md,
                    fontFamily: theme.fonts.primary,
                  }}
                />
                <Bar dataKey="wines" fill={theme.colors.purple500} radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Wine Table */}
        <div style={{
          background: theme.colors.bgCard,
          borderRadius: theme.borderRadius.lg,
          boxShadow: theme.shadows.md,
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '20px 24px',
            borderBottom: `1px solid ${theme.colors.purple100}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h2 style={{
                margin: 0,
                fontSize: 16,
                fontWeight: 700,
                color: theme.colors.textDark,
                fontFamily: theme.fonts.primary,
              }}>
                Wine Inventory
              </h2>
              <PlusAccent size={14} />
              <span style={{
                marginLeft: 8,
                padding: '4px 12px',
                borderRadius: theme.borderRadius.full,
                background: theme.colors.purple100,
                color: theme.colors.purple600,
                fontSize: 12,
                fontWeight: 600,
                fontFamily: theme.fonts.primary,
              }}>
                {filteredWines.length} wines
              </span>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: theme.colors.purple50 }}>
                  {['Source', 'Wine', 'Region', 'Year', 'Score', 'Price', 'Discount', 'Liquidity', 'Trend', 'Value', 'Signal'].map(col => (
                    <th key={col} style={{
                      padding: '12px',
                      fontSize: 10,
                      fontWeight: 700,
                      color: theme.colors.textLight,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      textAlign: col === 'Wine' ? 'left' : 'center',
                      fontFamily: theme.fonts.primary,
                    }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredWines.map(wine => (
                  <WineRow
                    key={wine.id}
                    wine={wine}
                    onClick={() => setSelectedWine(selectedWine?.id === wine.id ? null : wine)}
                    isSelected={selectedWine?.id === wine.id}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Panel */}
        {selectedWine && (
          <div style={{
            marginTop: 24,
            background: theme.colors.bgCard,
            borderRadius: theme.borderRadius.lg,
            padding: 28,
            boxShadow: theme.shadows.lg,
            border: `2px solid ${theme.colors.purple300}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <SourceBadge source={selectedWine.source} />
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: theme.borderRadius.sm,
                    background: theme.colors.purple50,
                    color: theme.colors.purple600,
                    fontSize: 12,
                    fontWeight: 500,
                    fontFamily: theme.fonts.primary,
                  }}>
                    {selectedWine.region} · {selectedWine.subRegion}
                  </span>
                </div>
                <h3 style={{
                  margin: 0,
                  fontSize: 20,
                  fontWeight: 700,
                  color: theme.colors.textDark,
                  fontFamily: theme.fonts.primary,
                }}>
                  {selectedWine.name}
                </h3>
                <p style={{
                  margin: '4px 0 0',
                  fontSize: 14,
                  color: theme.colors.textMedium,
                  fontFamily: theme.fonts.primary,
                }}>
                  {selectedWine.producer} · Vintage {selectedWine.vintage}
                </p>
              </div>
              <button
                onClick={() => setSelectedWine(null)}
                style={{
                  background: theme.colors.purple50,
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: theme.borderRadius.md,
                  cursor: 'pointer',
                  fontSize: 13,
                  color: theme.colors.textMedium,
                  fontWeight: 500,
                  fontFamily: theme.fonts.primary,
                }}
              >
                Close ✕
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
              {[
                { label: 'Market Price', value: formatPrice(selectedWine.marketPrice, selectedWine.source) },
                { label: 'Current Bid', value: formatPrice(selectedWine.highestBid, selectedWine.source) },
                { label: 'Discount', value: `${selectedWine.discount}%` },
                { label: 'Critic Score', value: selectedWine.criticScore },
                { label: 'Value Score', value: selectedWine.valueScore },
                { label: selectedWine.auctionEnd ? 'Auction Ends' : 'Liquidity', value: selectedWine.auctionEnd ? getTimeRemaining(selectedWine.auctionEnd) : `${selectedWine.liquidityScore}/5` },
              ].map(item => (
                <div key={item.label} style={{
                  padding: 16,
                  background: theme.colors.purple50,
                  borderRadius: theme.borderRadius.md,
                }}>
                  <p style={{
                    margin: 0,
                    fontSize: 10,
                    color: theme.colors.textLight,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: 600,
                    fontFamily: theme.fonts.primary,
                  }}>
                    {item.label}
                  </p>
                  <p style={{
                    margin: '6px 0 0',
                    fontSize: 18,
                    fontWeight: 700,
                    color: theme.colors.purple600,
                    fontFamily: theme.fonts.primary,
                  }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 24 }}>
              <h4 style={{
                margin: '0 0 12px',
                fontSize: 12,
                fontWeight: 700,
                color: theme.colors.textLight,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontFamily: theme.fonts.primary,
              }}>
                Price History
              </h4>
              <ResponsiveContainer width="100%" height={100}>
                <LineChart data={selectedWine.priceHistory.map((p, i) => ({ month: `M${i + 1}`, price: p }))}>
                  <XAxis dataKey="month" tick={{ fill: theme.colors.textLight, fontSize: 10, fontFamily: theme.fonts.primary }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: theme.colors.textLight, fontSize: 10, fontFamily: theme.fonts.primary }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: theme.colors.bgCard,
                      border: `1px solid ${theme.colors.purple200}`,
                      borderRadius: theme.borderRadius.sm,
                      fontFamily: theme.fonts.primary,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke={theme.colors.purple500}
                    strokeWidth={3}
                    dot={{ r: 4, fill: theme.colors.purple500 }}
                    activeDot={{ r: 6, fill: theme.colors.accent }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        padding: '24px 40px',
        borderTop: `1px solid ${theme.colors.purple100}`,
        background: theme.colors.bgCard,
        textAlign: 'center',
      }}>
        <p style={{
          margin: 0,
          fontSize: 12,
          color: theme.colors.textLight,
          fontFamily: theme.fonts.primary,
        }}>
          Data from CultX, WineBid & K&L Wines · WineValue<PlusAccent size={10} /> Dashboard
        </p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        input[type="range"] { height: 4px; border-radius: 2px; background: ${theme.colors.purple200}; }
        input[type="range"]::-webkit-slider-thumb { 
          -webkit-appearance: none; 
          width: 16px; 
          height: 16px; 
          border-radius: 50%; 
          background: ${theme.colors.purple500}; 
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        tr:hover { background: ${theme.colors.purple50} !important; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: ${theme.colors.purple50}; }
        ::-webkit-scrollbar-thumb { background: ${theme.colors.purple300}; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: ${theme.colors.purple400}; }
      `}</style>
    </div>
  );
}
