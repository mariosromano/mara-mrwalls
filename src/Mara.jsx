import { useState, useRef, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// MARA V14.2 - Product Knowledge + Credibility Assets + Two Modes
// ═══════════════════════════════════════════════════════════════════════════════

const CLOUDINARY_BASE = 'https://res.cloudinary.com/dtlodxxio/image/upload';
const CLOUDINARY_VIDEO = 'https://res.cloudinary.com/dtlodxxio/video/upload';

// ═══════════════════════════════════════════════════════════════════════════════
// COMPANY KNOWLEDGE - Mara's brain
// ═══════════════════════════════════════════════════════════════════════════════

const COMPANY_KNOWLEDGE = {
  identity: {
    name: "MR Walls (Romano Studio LLC)",
    tagline: "DuPont Corian's exclusive North American partner for architectural walls",
    stats: {
      projects: "1,000+",
      revenue: "$3.5M",
      warranty: "10-year DuPont warranty",
      complaints: "Zero complaints/returns"
    }
  },
  
  credibilityProjects: [
    "LAX American Airlines — 5,000 SF, 16-day install",
    "Jefferson Health — 17,000 SF healthcare",
    "Wynn Casino — most photographed installation",
    "SpaceX, Mercedes F1, Crypto.com Arena",
    "Cedars-Sinai, Toronto General Hospital",
    "University of Wisconsin — 12,000 SF, GREENGUARD"
  ],
  
  eliteFirms: ["Gensler", "HOK", "HDR", "Perkins & Will", "Stantec", "HKS", "NBBJ"],
  
  interlockPanel: {
    patent: "US Patent 11,899,418 B2",
    description: "Patented puzzle-piece joining system — seamless at any scale",
    panelSize: "144\" × 48\" (up to 144\" × 60\")",
    seamTolerance: "1/32\" filled with color-matched adhesive",
    cncPrecision: "±1/64\"",
    overallTolerance: "±1/16\" across full installation",
    installRate: "~300 SF/day — 40% faster than tile",
    fieldCutting: "Zero — panels arrive ready to install"
  },
  
  material: {
    name: "DuPont Corian Solid Surface",
    thickness: "12mm",
    properties: [
      "Non-porous, hygienic, seamless",
      "Scratches buff out with Scotch-Brite",
      "Class A fire rating",
      "Warm to touch (unlike stone/metal)",
      "UV-stable formulations for exterior",
      "Metal-free (critical for MRI rooms)",
      "15-20+ year lifespan commercial"
    ],
    certifications: [
      "GREENGUARD (healthcare approved)",
      "NSF/FDA (food contact safe)",
      "Exterior certified (190 mph wind rating)"
    ],
    cleaning: "Any household cleaner, magic eraser, isopropyl, acetone, bleach — all safe"
  },
  
  colors: {
    "Glacier White": { hex: "#f5f5f5", note: "Best for backlighting, most common" },
    "Deep Nocturne": { hex: "#1a1a1a", note: "Black, dramatic, no light transmission" },
    "Dove": { hex: "#9a9a9a", note: "Warm grey" },
    "Carbon Concrete": { hex: "#3a3a3a", note: "Dark shale grey" },
    "Neutral Concrete": { hex: "#b8b5b0", note: "Light grey, honest material" },
    "Artista Mist": { hex: "#c5c5c5", note: "Subtle movement" },
    "Laguna": { hex: "#1e3a5f", note: "Deep blue, bold statement" },
    "Verdant": { hex: "#2d4a4a", note: "Teal green, calming" }
  },
  
  pricing: {
    linear: { price: 25, description: "Linear Collection — repeatable patterns" },
    custom: { price: 50, description: "Custom Line — includes shop drawings" },
    addons: {
      backlight: 15,
      waterFeature: 20
    },
    volumeDiscount: "2000+ SF: ~15% off",
    competitive: "Premium tile often hits $40-60/SF installed (substrate, waterproofing, grouting, maintenance). We're competitive AND zero maintenance."
  },
  
  timeline: {
    dfp: "3-5 business days",
    designRefinement: "1-2 weeks",
    shopDrawingApproval: "1 week",
    production: "6-10 weeks",
    shipping: "3-7 days",
    total: "10-14 weeks from DFP approval",
    expedited: "6 weeks possible (Mercedes F1, SpaceX)"
  },
  
  backlight: {
    projectPercentage: "40-51% of projects",
    valueMultiplier: "4x higher value ($48K vs $12K avg)",
    material: "Glacier White only — translucent",
    clearance: "3\" minimum behind panel",
    capability: "RGB/programmable capable",
    included: "MR Walls provides complete package: drawings, electrical sizing, drivers, controls"
  },
  
  sectors: {
    healthcare: {
      projects: "40+",
      avgValue: "$37K",
      trifecta: "Infection control + Durability + Therapeutic aesthetics",
      benefits: ["Non-porous, no grout, bleach-safe", "Metal-free for MRI rooms", "Calming patterns reduce patient anxiety"]
    },
    hospitality: {
      focus: "Brand storytelling, Instagram-ability",
      highlight: "Wynn wall = most photographed",
      benefit: "Custom patterns can incorporate brand elements"
    },
    corporate: {
      focus: "Talent attraction, executive presence",
      approach: "Match pattern to company values"
    },
    residential: {
      cycle: "3-8 months (quick-turn cash flow)",
      benefits: ["Seamless showers", "Warm to touch", "Water features indoor/outdoor"]
    }
  },
  
  objections: {
    expensive: "Reframe to total installed cost: 40% faster install saves labor. $50/SF becomes ~$40/SF true cost. Zero maintenance over lifetime.",
    timeline: "Standard 6-10 weeks, expedited possible. Linear Collection faster.",
    durability: "LAX sees millions of passengers, zero maintenance issues. Wynn still perfect after 5 years of 24/7 casino traffic. Scratches buff out.",
    comparison: "Unlike tile: no grout to crack or harbor bacteria. Unlike stone: repairable, can be backlit. Unlike metal: warm to touch, no visible fasteners."
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// CORIAN COLORS (for swatches)
// ═══════════════════════════════════════════════════════════════════════════════

const CORIAN_COLORS = COMPANY_KNOWLEDGE.colors;

// ═══════════════════════════════════════════════════════════════════════════════
// VIDEOS - Technical and credibility
// ═══════════════════════════════════════════════════════════════════════════════

const VIDEOS = [
  {
    id: 'video-lax-install',
    title: 'InterlockPanel Installation',
    description: 'Watch the puzzle pieces come together at LAX',
    url: `${CLOUDINARY_VIDEO}/v1765772971/install_MR-LAX_720_-_puzzle_video_-_720_x_1280_m2ewcs.mp4`,
    tags: ['installation', 'technical', 'interlockpanel', 'lax']
  },
  {
    id: 'video-quantum',
    title: 'Quantum Wellness Branding',
    description: 'Backlit branding wall in healthcare',
    url: `${CLOUDINARY_VIDEO}/v1765773011/Quantum-Wellness-branding_ntok0l.mp4`,
    tags: ['backlight', 'branding', 'healthcare', 'wellness']
  },
  {
    id: 'video-water-flow',
    title: 'Water Feature Flow',
    description: 'Water dancing over carved texture',
    url: `${CLOUDINARY_VIDEO}/v1765940110/mr-walls-water-flow_g5fj42.mp4`,
    tags: ['water', 'exterior', 'residential']
  },
  {
    id: 'video-water-mountain',
    title: 'Mountain Water Feature',
    description: 'Exterior water feature with mountain pattern',
    url: `${CLOUDINARY_VIDEO}/v1765940110/Water-mountain_xmrtuu.mp4`,
    tags: ['water', 'exterior', 'mountain']
  },
  {
    id: 'video-linear',
    title: 'Linear Collection Showcase',
    description: 'Linear designs in calm white aesthetic',
    url: `${CLOUDINARY_VIDEO}/v1765940110/Linear_pumahd.mp4`,
    tags: ['linear', 'white', 'calm']
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// IMAGE CATALOG - Design assets + Credibility projects
// ═══════════════════════════════════════════════════════════════════════════════

const IMAGE_CATALOG = [
  // ─────────────────────────────────────────────────────────────────────────────
  // CREDIBILITY PROJECTS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'lax-american',
    pattern: 'Sand Dune',
    title: 'LAX American Airlines',
    sector: 'Aviation',
    corianColor: 'Glacier White',
    mood: ['monumental', 'travel', 'landmark'],
    isBacklit: false,
    keywords: ['lax', 'airport', 'american airlines', 'aviation', 'sand dune', 'landmark', 'la'],
    image: `${CLOUDINARY_BASE}/v1765940110/LAX_American_Airlines_-_Large_nlbf8w.jpg`,
    specs: { material: 'DuPont Corian®', color: 'Glacier White', size: '5,000 SF', leadTime: '16-day install', pricePerSF: 50, system: 'InterlockPanel™' },
    description: 'LAX American Airlines — 5,000 SF installed in 16 days. Millions of passengers see this wall annually. Zero maintenance issues.',
    isCredibility: true
  },
  {
    id: 'capital-one-arena',
    pattern: 'Clouds',
    title: 'Capital One Arena VIP',
    sector: 'Sports',
    corianColor: 'Glacier White',
    mood: ['vip', 'sports', 'illuminated'],
    isBacklit: true,
    keywords: ['capital one', 'arena', 'sports', 'vip', 'bar', 'backlit', 'backlight', 'clouds'],
    image: `${CLOUDINARY_BASE}/v1765773872/COAT_Capital_One_Arena_VIP_Bar_-_Large_yplafr.png`,
    specs: { material: 'DuPont Corian®', color: 'Glacier White', leadTime: '8 Weeks', pricePerSF: 65, enhancement: 'Backlighting', system: 'InterlockPanel™' },
    description: 'Capital One Arena VIP bar — Cloud pattern with backlighting. Premium sports hospitality.',
    isCredibility: true
  },
  {
    id: 'jamboree-bridge',
    pattern: 'Custom',
    title: 'Jamboree Bridge Irvine',
    sector: 'Exterior',
    corianColor: 'Dove',
    mood: ['exterior', 'architectural', 'bridge'],
    isBacklit: false,
    keywords: ['bridge', 'irvine', 'exterior', 'facade', 'dove', 'grey', 'custom'],
    image: `${CLOUDINARY_BASE}/v1765771521/Bridge-white-irvine_-_Large_kjkree.png`,
    specs: { material: 'DuPont Corian®', color: 'Dove Grey', leadTime: '10 Weeks', pricePerSF: 75, enhancement: 'UV-Stable Exterior', system: 'French Cleat' },
    description: 'Jamboree Bridge in Irvine — custom exterior Corian in Dove Grey. UV-stable, hurricane rated.',
    isCredibility: true
  },
  {
    id: 'toll-brothers',
    pattern: 'Custom',
    title: 'Toll Brothers San Diego',
    sector: 'Multifamily',
    corianColor: 'Laguna',
    mood: ['exterior', 'blue', 'branding'],
    isBacklit: false,
    keywords: ['toll brothers', 'multifamily', 'san diego', 'blue', 'laguna', 'facade', 'branding'],
    image: `${CLOUDINARY_BASE}/v1765771520/Toll_Brothers_Lindley_Facade_-_Large_j0k974.png`,
    specs: { material: 'DuPont Corian®', color: 'Laguna (Blue)', leadTime: '10 Weeks', pricePerSF: 75, enhancement: 'UV-Stable Exterior', system: 'French Cleat' },
    description: 'Toll Brothers Lindley facade — custom design in Laguna blue based on brand direction.',
    isCredibility: true
  },
  {
    id: 'christ-journey',
    pattern: 'Custom',
    title: 'Christ Journey Church',
    sector: 'Religious',
    corianColor: 'Glacier White',
    mood: ['exterior', 'spiritual', 'hurricane'],
    isBacklit: false,
    keywords: ['church', 'religious', 'florida', 'hurricane', 'thermoformed', 'exterior', 'white'],
    image: `${CLOUDINARY_BASE}/v1765771518/christ_journey_church_facade_2_-_Large_iigy6o.png`,
    specs: { material: 'DuPont Corian®', color: 'Glacier White', leadTime: '12 Weeks', pricePerSF: 85, enhancement: 'Hurricane Rated + Thermoformed', system: 'French Cleat' },
    description: 'Christ Journey Church, South Florida — hurricane rated facade with thermoformed panels. Hidden French cleat connections.',
    isCredibility: true
  },
  {
    id: 'fergusons-ny',
    pattern: 'Custom',
    title: "Ferguson's Flagship NY",
    sector: 'Retail',
    corianColor: 'Glacier White',
    mood: ['retail', 'flagship', 'branding'],
    isBacklit: false,
    keywords: ['ferguson', 'retail', 'new york', 'flagship', 'showroom', 'branding'],
    image: `${CLOUDINARY_BASE}/v1765940110/Ferguson_s_flagship_NY_1_-_Medium_djt9bv.jpg`,
    specs: { material: 'DuPont Corian®', color: 'Glacier White', leadTime: '8 Weeks', pricePerSF: 50, system: 'InterlockPanel™' },
    description: "Ferguson's flagship showroom in New York — premium retail branding wall.",
    isCredibility: true
  },
  {
    id: 'starbucks-greatwave',
    pattern: 'Great Wave',
    title: 'Starbucks Great Wave',
    sector: 'Retail',
    corianColor: 'Glacier White',
    mood: ['retail', 'coffee', 'artistic'],
    isBacklit: false,
    keywords: ['starbucks', 'retail', 'coffee', 'great wave', 'artistic'],
    image: `${CLOUDINARY_BASE}/v1765940110/Great-wave-Starbucks_dgcdto.jpg`,
    specs: { material: 'DuPont Corian®', color: 'Glacier White', leadTime: '6 Weeks', pricePerSF: 50, system: 'InterlockPanel™' },
    description: 'Starbucks with Great Wave pattern — artistic statement in retail environment.',
    isCredibility: true
  },
  {
    id: 'seattle-tower',
    pattern: 'Linear Custom',
    title: 'Seattle Tower Aviation',
    sector: 'Aviation',
    corianColor: 'Neutral Concrete',
    mood: ['aviation', 'modern', 'linear'],
    isBacklit: false,
    keywords: ['seattle', 'airport', 'aviation', 'linear', 'tower', 'neutral', 'concrete'],
    image: `${CLOUDINARY_BASE}/v1765940110/Seattle-tower-with-model_jsyq43.jpg`,
    specs: { material: 'DuPont Corian®', color: 'Neutral Concrete', leadTime: '8 Weeks', pricePerSF: 35, system: 'InterlockPanel™' },
    description: 'Seattle Tower — custom linear collection in natural stone color for aviation.',
    isCredibility: true
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // RESIDENTIAL SHOWERS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'comet-shower',
    pattern: 'Comet',
    title: 'Comet White Shower',
    sector: 'Residential',
    corianColor: 'Glacier White',
    mood: ['spa', 'luxury', 'seamless'],
    isBacklit: false,
    keywords: ['shower', 'bathroom', 'residential', 'comet', 'white', 'spa', 'seamless'],
    image: `${CLOUDINARY_BASE}/v1765940110/Comet_White_Shower_-_Large_nrboyr.jpg`,
    specs: { material: 'DuPont Corian®', color: 'Glacier White', leadTime: '4 Weeks', pricePerSF: 50, system: 'InterlockPanel™' },
    description: 'Comet pattern shower — seamless, no grout lines. Non-porous Corian handles water perfectly.'
  },
  {
    id: 'quilt-shower',
    pattern: 'White Quilt',
    title: 'White Quilt Shower',
    sector: 'Residential',
    corianColor: 'Glacier White',
    mood: ['spa', 'luxury', 'textured'],
    isBacklit: false,
    keywords: ['shower', 'bathroom', 'residential', 'quilt', 'white', 'spa', 'texture'],
    image: `${CLOUDINARY_BASE}/v1765940110/White_Quilt_Shower_Application_-_Large_qky4ev.jpg`,
    specs: { material: 'DuPont Corian®', color: 'Glacier White', leadTime: '4 Weeks', pricePerSF: 50, system: 'InterlockPanel™' },
    description: 'White Quilt shower — textured pattern creates visual interest. Warm to touch, zero maintenance.'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // INDUSTRIAL BRICK - 6 Colors
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'industrial-brick-carbon',
    pattern: 'Industrial Brick',
    patternFamily: 'Industrial Brick',
    title: 'Industrial Brick',
    sector: 'Aviation',
    corianColor: 'Carbon Concrete',
    mood: ['dramatic', 'industrial', 'modern'],
    isBacklit: false,
    keywords: ['industrial', 'brick', 'carbon', 'concrete', 'dark', 'grey', 'aviation'],
    image: `${CLOUDINARY_BASE}/Carbon_Concrete-industrial_vxloqv.png`,
    specs: { material: 'DuPont Corian®', color: 'Carbon Concrete', maxPanel: '144" × 60"', leadTime: '6-10 Weeks', pricePerSF: 25, system: 'InterlockPanel™' },
    description: 'Industrial Brick in Carbon Concrete — dark shale grey. Linear Collection, $25/SF.'
  },
  {
    id: 'industrial-brick-dove',
    pattern: 'Industrial Brick',
    patternFamily: 'Industrial Brick',
    title: 'Industrial Brick',
    sector: 'Aviation',
    corianColor: 'Dove',
    mood: ['warm', 'neutral', 'calm'],
    isBacklit: false,
    keywords: ['industrial', 'brick', 'dove', 'grey', 'warm', 'soft'],
    image: `${CLOUDINARY_BASE}/Dove_industrial_w6jvlx.png`,
    specs: { material: 'DuPont Corian®', color: 'Dove', maxPanel: '144" × 60"', leadTime: '6-10 Weeks', pricePerSF: 25, system: 'InterlockPanel™' },
    description: 'Industrial Brick in Dove — soft warm grey. Versatile, works anywhere.'
  },
  {
    id: 'industrial-brick-neutral',
    pattern: 'Industrial Brick',
    patternFamily: 'Industrial Brick',
    title: 'Industrial Brick',
    sector: 'Aviation',
    corianColor: 'Neutral Concrete',
    mood: ['neutral', 'honest', 'modern'],
    isBacklit: false,
    keywords: ['industrial', 'brick', 'neutral', 'concrete', 'light'],
    image: `${CLOUDINARY_BASE}/Neautral_concrete-industrial_v7gbel.png`,
    specs: { material: 'DuPont Corian®', color: 'Neutral Concrete', maxPanel: '144" × 60"', leadTime: '6-10 Weeks', pricePerSF: 25, system: 'InterlockPanel™' },
    description: 'Industrial Brick in Neutral Concrete — honest material feel. Architects love it.'
  },
  {
    id: 'industrial-brick-artista',
    pattern: 'Industrial Brick',
    patternFamily: 'Industrial Brick',
    title: 'Industrial Brick',
    sector: 'Aviation',
    corianColor: 'Artista Mist',
    mood: ['subtle', 'refined', 'calm'],
    isBacklit: false,
    keywords: ['industrial', 'brick', 'artista', 'mist', 'subtle'],
    image: `${CLOUDINARY_BASE}/Artista_Mist_Industrial_zfaemp.png`,
    specs: { material: 'DuPont Corian®', color: 'Artista Mist', maxPanel: '144" × 60"', leadTime: '6-10 Weeks', pricePerSF: 25, system: 'InterlockPanel™' },
    description: 'Industrial Brick in Artista Mist — subtle surface movement.'
  },
  {
    id: 'industrial-brick-laguna',
    pattern: 'Industrial Brick',
    patternFamily: 'Industrial Brick',
    title: 'Industrial Brick',
    sector: 'Aviation',
    corianColor: 'Laguna',
    mood: ['bold', 'dramatic', 'statement'],
    isBacklit: false,
    keywords: ['industrial', 'brick', 'laguna', 'blue', 'bold', 'statement'],
    image: `${CLOUDINARY_BASE}/Laguna-blue-industrial_ksz6w7.png`,
    specs: { material: 'DuPont Corian®', color: 'Laguna', maxPanel: '144" × 60"', leadTime: '6-10 Weeks', pricePerSF: 25, system: 'InterlockPanel™' },
    description: 'Industrial Brick in Laguna — bold deep blue. Makes a statement.'
  },
  {
    id: 'industrial-brick-verdant',
    pattern: 'Industrial Brick',
    patternFamily: 'Industrial Brick',
    title: 'Industrial Brick',
    sector: 'Aviation',
    corianColor: 'Verdant',
    mood: ['natural', 'calm', 'biophilic'],
    isBacklit: false,
    keywords: ['industrial', 'brick', 'verdant', 'green', 'teal', 'nature'],
    image: `${CLOUDINARY_BASE}/Verdant_Industrial_bmkodk.png`,
    specs: { material: 'DuPont Corian®', color: 'Verdant', maxPanel: '144" × 60"', leadTime: '6-10 Weeks', pricePerSF: 25, system: 'InterlockPanel™' },
    description: 'Industrial Brick in Verdant — deep teal brings nature in.'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // GREAT WAVE
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'greatwave-1',
    pattern: 'Great Wave',
    title: 'Great Wave Artistic',
    sector: 'Hospitality',
    corianColor: 'Glacier White',
    mood: ['dramatic', 'artistic', 'statement'],
    isBacklit: false,
    keywords: ['great wave', 'wave', 'ocean', 'japanese', 'hokusai', 'dramatic'],
    image: `${CLOUDINARY_BASE}/Great_Wave_banana_03_copy_herewl.png`,
    specs: { material: 'DuPont Corian®', color: 'Glacier White', maxPanel: '144" × 48"', leadTime: '6 Weeks', pricePerSF: 50, system: 'InterlockPanel™' },
    description: 'Great Wave — inspired by Hokusai. Custom Line, $50/SF.'
  },
  {
    id: 'greatwave-shower',
    pattern: 'Great Wave',
    title: 'Great Wave Shower',
    sector: 'Residential',
    corianColor: 'Glacier White',
    mood: ['calm', 'luxury', 'spa'],
    isBacklit: false,
    keywords: ['great wave', 'shower', 'bathroom', 'residential', 'luxury'],
    image: `${CLOUDINARY_BASE}/Lim_Great_Wave_shower_contrast_square_copy_yvkh08.jpg`,
    specs: { material: 'DuPont Corian®', color: 'Glacier White', maxPanel: '144" × 48"', leadTime: '6 Weeks', pricePerSF: 50, system: 'InterlockPanel™' },
    description: 'Great Wave shower — seamless luxury, no grout.'
  },
  {
    id: 'greatwave-exterior',
    pattern: 'Great Wave',
    title: 'Great Wave Exterior',
    sector: 'Residential',
    corianColor: 'Glacier White',
    mood: ['dramatic', 'outdoor'],
    isBacklit: false,
    keywords: ['great wave', 'exterior', 'facade', 'outdoor', 'pool'],
    image: `${CLOUDINARY_BASE}/Great_Wave_banana_20_copy_abzou8.png`,
    specs: { material: 'DuPont Corian®', color: 'Glacier White', maxPanel: '144" × 48"', leadTime: '8 Weeks', pricePerSF: 65, enhancement: 'UV-Stable Exterior', system: 'French Cleat' },
    description: 'Great Wave exterior — UV-stable for full sun.'
  },
  {
    id: 'greatwave-restaurant',
    pattern: 'Great Wave',
    title: 'Great Wave Restaurant',
    sector: 'Hospitality',
    corianColor: 'Glacier White',
    mood: ['dramatic', 'statement', 'social'],
    isBacklit: false,
    keywords: ['great wave', 'restaurant', 'hospitality', 'dining'],
    image: `${CLOUDINARY_BASE}/Great_Wave_banana_09_copy_lcqfa0.png`,
    specs: { material: 'DuPont Corian®', color: 'Glacier White', maxPanel: '144" × 48"', leadTime: '6 Weeks', pricePerSF: 50, system: 'InterlockPanel™' },
    description: 'Great Wave restaurant — photographs beautifully for social.'
  },
  {
    id: 'greatwave-lobby',
    pattern: 'Great Wave',
    title: 'Great Wave Lobby',
    sector: 'Corporate',
    corianColor: 'Glacier White',
    mood: ['dramatic', 'bold', 'corporate'],
    isBacklit: false,
    keywords: ['great wave', 'lobby', 'corporate', 'reception'],
    image: `${CLOUDINARY_BASE}/Great_Wave_banana_16_copy_ojsshm.png`,
    specs: { material: 'DuPont Corian®', color: 'Glacier White', maxPanel: '144" × 48"', leadTime: '6 Weeks', pricePerSF: 50, system: 'InterlockPanel™' },
    description: 'Great Wave lobby — bold corporate statement.'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BRICK WATER FEATURE
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'brick-water-1',
    pattern: 'Brick',
    title: 'Brick Water Feature',
    sector: 'Residential',
    corianColor: 'Deep Nocturne',
    mood: ['dramatic', 'luxury', 'tropical'],
    isBacklit: false,
    keywords: ['brick', 'water', 'fountain', 'pool', 'waterfall', 'black'],
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_05_copy_kewkyh.png`,
    specs: { material: 'DuPont Corian®', color: 'Deep Nocturne', maxPanel: '144" × 60"', leadTime: '8 Weeks', pricePerSF: 85, enhancement: 'Water Feature', system: 'InterlockPanel™' },
    description: 'Brick water feature — carved lines channel water into waterfalls.'
  },
  {
    id: 'brick-water-3',
    pattern: 'Brick',
    title: 'Brick Backlit + Water',
    sector: 'Residential',
    corianColor: 'Glacier White',
    mood: ['dramatic', 'luxury', 'glowing'],
    isBacklit: true,
    keywords: ['brick', 'water', 'backlit', 'backlight', 'glow', 'white'],
    image: `${CLOUDINARY_BASE}/Brick_waterfeature_20_copy_ffh4px.png`,
    specs: { material: 'DuPont Corian®', color: 'Glacier White', maxPanel: '144" × 60"', leadTime: '10 Weeks', pricePerSF: 120, enhancement: 'Backlit + Water Feature', system: 'InterlockPanel™' },
    description: 'Brick with backlighting AND water — light glows through as water cascades.'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BUDDHA (backlit)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'buddha-1',
    pattern: 'Buddha Mandala',
    title: 'Buddha Mandala Spa',
    sector: 'Wellness',
    corianColor: 'Glacier White',
    mood: ['calm', 'spiritual', 'meditation', 'zen'],
    isBacklit: true,
    keywords: ['buddha', 'zen', 'meditation', 'spiritual', 'spa', 'wellness', 'backlit', 'backlight'],
    image: `${CLOUDINARY_BASE}/spa-_Buddha_2_zid08z.png`,
    specs: { material: 'DuPont Corian®', color: 'Glacier White', maxPanel: '144" × 60"', leadTime: '8 Weeks', pricePerSF: 75, enhancement: 'Backlighting', system: 'InterlockPanel™' },
    description: 'Buddha mandala — custom carved, backlit for ethereal glow. Custom Line.'
  },
  {
    id: 'buddha-2',
    pattern: 'Buddha Mandala',
    title: 'Buddha Restaurant',
    sector: 'Hospitality',
    corianColor: 'Glacier White',
    mood: ['calm', 'zen', 'warm', 'dining'],
    isBacklit: true,
    keywords: ['buddha', 'restaurant', 'asian', 'zen', 'dining', 'backlit', 'backlight'],
    image: `${CLOUDINARY_BASE}/Spa_Buddha_restaurant_yybtdi.png`,
    specs: { material: 'DuPont Corian®', color: 'Glacier White', maxPanel: '144" × 60"', leadTime: '8 Weeks', pricePerSF: 75, enhancement: 'Backlighting', system: 'InterlockPanel™' },
    description: 'Buddha in restaurant — warm backlighting sets the mood.'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // FLAME
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'flame-1',
    pattern: 'Flame',
    title: 'Flame Pattern',
    sector: 'General',
    corianColor: 'Glacier White',
    mood: ['warm', 'organic', 'flowing', 'vertical'],
    isBacklit: false,
    keywords: ['flame', 'fire', 'warm', 'organic', 'flowing', 'vertical'],
    image: `${CLOUDINARY_BASE}/Flame-_qle4y3.jpg`,
    specs: { material: 'DuPont Corian®', color: 'Glacier White', maxPanel: '144" × 60"', leadTime: '6 Weeks', pricePerSF: 50, system: 'InterlockPanel™' },
    description: 'Flame — flowing vertical waves that interweave. Custom Line.'
  },
  {
    id: 'flame-pink',
    pattern: 'Flame',
    title: 'Flame Pink RGB',
    sector: 'Residential',
    corianColor: 'Glacier White',
    mood: ['dramatic', 'romantic', 'bold', 'glowing'],
    isBacklit: true,
    keywords: ['flame', 'pink', 'rgb', 'backlit', 'backlight', 'romantic', 'glow'],
    image: `${CLOUDINARY_BASE}/Flame_pink_obxnpm.jpg`,
    specs: { material: 'DuPont Corian®', color: 'Glacier White', maxPanel: '144" × 60"', leadTime: '8 Weeks', pricePerSF: 65, enhancement: 'RGB Backlighting', system: 'InterlockPanel™' },
    description: 'Flame with pink RGB — dramatic, romantic. Color shifts throughout evening.'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // DESERT SUNSET
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'desert-sunset-1',
    pattern: 'Desert Sunset',
    title: 'Desert Sunset Cactus',
    sector: 'Hospitality',
    corianColor: 'Glacier White',
    mood: ['calm', 'regional', 'warm', 'southwestern'],
    isBacklit: true,
    keywords: ['desert', 'sunset', 'cactus', 'arizona', 'southwest', 'scottsdale', 'backlit', 'backlight'],
    image: `${CLOUDINARY_BASE}/v1768111216/mr-render-1767989995638_copy_vtszj0.png`,
    specs: { material: 'DuPont Corian®', color: 'Glacier White', height: '142"', width: '239¾"', slabs: 5, leadTime: '4 Weeks', pricePerSF: 35, enhancement: 'Backlighting', system: 'InterlockPanel™' },
    shopDrawing: `${CLOUDINARY_BASE}/v1768330379/shop_drawing-Cactus_rovjta.png`,
    description: 'Desert Sunset — saguaro cactus silhouettes. Regional Southwest hospitality. Linear Collection.'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BILLOW
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'billow-render',
    pattern: 'Billow',
    title: 'Billow White',
    sector: 'General',
    corianColor: 'Glacier White',
    mood: ['calm', 'organic', 'flowing'],
    isBacklit: false,
    keywords: ['billow', 'wave', 'organic', 'flowing', 'texture', 'white', 'calm'],
    image: `${CLOUDINARY_BASE}/Billow_-_Render-001_copy_ujsmd4.png`,
    specs: { material: 'DuPont Corian®', color: 'Glacier White', maxPanel: '144" × 60"', leadTime: '6 Weeks', pricePerSF: 50, system: 'InterlockPanel™' },
    description: 'Billow — gentle horizontal waves like wind across water. Custom Line.'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // MARILYN (Custom capability)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'marilyn-1',
    pattern: 'Custom Portrait',
    title: 'Marilyn Portrait',
    sector: 'Hospitality',
    corianColor: 'Glacier White',
    mood: ['artistic', 'bold', 'custom', 'iconic'],
    isBacklit: false,
    keywords: ['marilyn', 'portrait', 'hollywood', 'custom', 'branding', 'art', 'celebrity'],
    image: `${CLOUDINARY_BASE}/Marilynn_sm_copy_gcvzcb.jpg`,
    specs: { material: 'DuPont Corian®', color: 'Glacier White', maxPanel: '144" × 60"', leadTime: '8 Weeks', pricePerSF: 85, system: 'InterlockPanel™' },
    description: 'Custom portrait capability — any image can be carved. Logos, celebrities, brand artwork.'
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// MODE DETECTION - Shopping vs Designer
// ═══════════════════════════════════════════════════════════════════════════════

const detectMode = (message) => {
  const lower = message.toLowerCase();
  
  // Shopping signals
  const shoppingPatterns = [
    /\d+\s*(sf|sq\s*ft|square\s*feet|sqft)/,
    /price|pricing|cost|how much|quote/,
    /lead time|timeline|delivery|when can/,
    /specs|specifications|spec sheet/,
    /order|purchase|buy/,
    /linear collection/
  ];
  
  // Designer signals
  const designerPatterns = [
    /designing|working on|project|exploring/,
    /recommend|ideas|options|possibilities/,
    /feeling|mood|vibe|atmosphere/,
    /hospital|hotel|lobby|spa|restaurant/,
    /custom|unique|one of a kind|branded/,
    /backlit|water feature|curved/,
    /what would|what do you think/
  ];
  
  let shopScore = 0;
  let designScore = 0;
  
  shoppingPatterns.forEach(pattern => {
    if (pattern instanceof RegExp ? pattern.test(lower) : lower.includes(pattern)) {
      shopScore += 2;
    }
  });
  
  designerPatterns.forEach(pattern => {
    if (pattern instanceof RegExp ? pattern.test(lower) : lower.includes(pattern)) {
      designScore += 2;
    }
  });
  
  // Default to designer if unclear (better to explore than rush)
  return shopScore > designScore ? 'shopping' : 'designer';
};

// ═══════════════════════════════════════════════════════════════════════════════
// SMART FAMILY GROUPING
// ═══════════════════════════════════════════════════════════════════════════════

const getFamilyImages = (selectedImage) => {
  if (!selectedImage) return [];
  
  if (selectedImage.patternFamily) {
    const colorVariants = IMAGE_CATALOG.filter(
      img => img.patternFamily === selectedImage.patternFamily && img.id !== selectedImage.id
    );
    if (colorVariants.length >= 3) return colorVariants.slice(0, 4);
  }
  
  const patternVariants = IMAGE_CATALOG.filter(
    img => img.pattern === selectedImage.pattern && img.id !== selectedImage.id
  );
  if (patternVariants.length >= 3) return patternVariants.slice(0, 4);
  
  const similar = IMAGE_CATALOG.map(img => {
    if (img.id === selectedImage.id) return { ...img, score: -1 };
    let score = 0;
    if (selectedImage.isBacklit && img.isBacklit) score += 5;
    if (selectedImage.specs?.enhancement && img.specs?.enhancement === selectedImage.specs.enhancement) score += 3;
    const sharedMoods = selectedImage.mood?.filter(m => img.mood?.includes(m)) || [];
    score += sharedMoods.length * 2;
    if (img.sector === selectedImage.sector) score += 2;
    const sharedKeywords = selectedImage.keywords.filter(k => img.keywords.includes(k));
    score += Math.min(sharedKeywords.length, 3);
    return { ...img, score };
  })
  .filter(img => img.score > 2)
  .sort((a, b) => b.score - a.score)
  .slice(0, 4);
  
  if (similar.length < 2) {
    return IMAGE_CATALOG.filter(img => img.id !== selectedImage.id).slice(0, 4);
  }
  return similar;
};

// ═══════════════════════════════════════════════════════════════════════════════
// SEARCH - Strict backlight filtering
// ═══════════════════════════════════════════════════════════════════════════════

const searchImages = (query) => {
  if (!query) return [];
  const lower = query.toLowerCase();
  
  if (lower.includes('backlight') || lower.includes('backlit') || lower.includes('glow') || lower.includes('illuminat')) {
    return IMAGE_CATALOG.filter(img => img.isBacklit === true).slice(0, 2);
  }
  
  const terms = lower.split(/\s+/).filter(t => t.length > 2);
  const scored = IMAGE_CATALOG.map(img => {
    let score = 0;
    terms.forEach(term => {
      if (img.keywords.some(k => k.includes(term))) score += 15;
      if (img.pattern.toLowerCase().includes(term)) score += 12;
      if (img.sector.toLowerCase().includes(term)) score += 10;
      if (img.title.toLowerCase().includes(term)) score += 8;
      if (img.mood?.some(m => m.includes(term))) score += 6;
    });
    return { ...img, score };
  });
  
  return scored.filter(img => img.score > 0).sort((a, b) => b.score - a.score).slice(0, 2);
};

// ═══════════════════════════════════════════════════════════════════════════════
// MARA SYSTEM PROMPT - Intelligent with knowledge
// ═══════════════════════════════════════════════════════════════════════════════

const MARA_SYSTEM_PROMPT = `You are Mara, the MR Walls design assistant. You have two modes based on user intent.

## YOUR MODES

### SHOPPING MODE (user knows what they want)
Triggers: mentions SF, asks pricing, wants specs, ready to buy
Tone: Efficient, helpful, get them what they need fast
Response: Give specs, pricing, lead time. Max 40 words. One image.
Example: "Industrial Brick in Laguna, $25/SF, 6-10 weeks lead time. [Image: industrial-brick-laguna] Want the spec sheet?"

### DESIGNER MODE (user is exploring)
Triggers: mentions project, sector, feeling, asks for ideas
Tone: Curious, warm, storytelling
Response: Ask about their space, show relevant projects, tell stories. Max 60 words. One question.
Example: "A hospital lobby — great canvas. Are you going for calming and healing, or a bold first impression? [Image: capital-one-arena] [Image: buddha-1]"

## COMPANY KNOWLEDGE

Identity: MR Walls — DuPont Corian's exclusive North American partner. 1,000+ projects. 10-year warranty. Zero complaints.

Credibility: LAX (5,000 SF, 16-day install), Wynn Casino (most photographed), SpaceX, Mercedes F1, Cedars-Sinai, Jefferson Health 17,000 SF.

Elite firms: Gensler, HOK, Perkins & Will, HDR, Stantec.

## PRODUCT KNOWLEDGE

InterlockPanel™: Patented puzzle-piece system. Seamless at any scale. 40% faster than tile. Zero field cutting.

Material: DuPont Corian 12mm. Non-porous, hygienic, repairable. Class A fire. 15-20 year lifespan. Metal-free for MRI.

Pricing:
- Linear Collection: $25/SF (repeatable patterns)
- Custom Line: $50/SF (includes shop drawings)
- Backlighting: +$15/SF
- Water Feature: +$20/SF

Timeline: 10-14 weeks total. Expedited to 6 weeks possible.

Backlight: 40-51% of projects. Glacier White only. 3" clearance. RGB capable. We provide complete package.

## OBJECTION RESPONSES

"Too expensive" → Total installed cost is competitive. 40% faster install. Zero maintenance.
"Timeline tight" → Standard 6-10 weeks, expedited possible. Linear is faster.
"Is it durable?" → LAX sees millions of passengers. Wynn perfect after 5 years 24/7. Scratches buff out.

## SECTOR EXPERTISE

Healthcare: 40+ projects. Non-porous, bleach-safe, metal-free for MRI. Calming patterns reduce anxiety.
Hospitality: Brand storytelling. Wynn = most photographed. Instagram-able.
Corporate: Talent attraction. Match pattern to company values.
Residential: Seamless showers, warm to touch, water features.

## IMAGE TAGS
Use [Image: id] for images. Max 2 per response.

Backlit ONLY: buddha-1, buddha-2, brick-water-3, flame-pink, desert-sunset-1, capital-one-arena
Credibility: lax-american, capital-one-arena, jamboree-bridge, toll-brothers, christ-journey, fergusons-ny, starbucks-greatwave, seattle-tower
Industrial Brick colors: industrial-brick-carbon, industrial-brick-dove, industrial-brick-neutral, industrial-brick-artista, industrial-brick-laguna, industrial-brick-verdant
Great Wave: greatwave-1, greatwave-shower, greatwave-exterior, greatwave-restaurant, greatwave-lobby
Residential: comet-shower, quilt-shower, greatwave-shower, brick-water-1, brick-water-3

## VIDEO TAGS
Use [Video: id] when relevant.
- video-lax-install: Show for installation questions
- video-water-flow: Show for water feature questions
- video-quantum: Show for backlit branding questions

## RULES
1. Detect mode from message, respond accordingly
2. Max 2 images per response
3. One question per response in Designer mode
4. In Shopping mode, give the number and offer next step
5. Never say "I don't have" — show similar or ask to clarify`;

const extractImageTags = (text) => {
  const matches = text.match(/\[Image:\s*([^\]]+)\]/g) || [];
  return matches.map(m => {
    const id = m.match(/\[Image:\s*([^\]]+)\]/)[1].trim();
    return IMAGE_CATALOG.find(img => img.id === id);
  }).filter(Boolean);
};

const extractVideoTags = (text) => {
  const matches = text.match(/\[Video:\s*([^\]]+)\]/g) || [];
  return matches.map(m => {
    const id = m.match(/\[Video:\s*([^\]]+)\]/)[1].trim();
    return VIDEOS.find(v => v.id === id);
  }).filter(Boolean);
};

const cleanResponse = (text) => text.replace(/\[Image:\s*[^\]]+\]/g, '').replace(/\[Video:\s*[^\]]+\]/g, '').trim();

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function MaraV142() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hey! I'm Mara from MR Walls — we've done LAX, Wynn Casino, SpaceX, and 1,000+ projects.\n\nAre you exploring ideas or ready to spec something specific?",
      images: [
        IMAGE_CATALOG.find(i => i.id === 'lax-american'),
        IMAGE_CATALOG.find(i => i.id === 'buddha-1')
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [familyImages, setFamilyImages] = useState([]);
  const [specsImage, setSpecsImage] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [history, setHistory] = useState([]);
  const messagesEndRef = useRef(null);
  const modalInputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getGalleryPatterns = () => {
    const patterns = {};
    IMAGE_CATALOG.forEach(img => {
      if (!patterns[img.pattern]) patterns[img.pattern] = [];
      patterns[img.pattern].push(img);
    });
    return patterns;
  };

  const handleImageClick = (img) => {
    const family = getFamilyImages(img);
    setSelectedImage(img);
    setFamilyImages(family);
    setSpecsImage(null);
  };

  const handleFamilyClick = (img) => {
    setSpecsImage(img);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setFamilyImages([]);
    setSpecsImage(null);
  };

  const closeSpecs = () => {
    setSpecsImage(null);
  };

  const callClaude = async (userMsg, hist) => {
    const mode = detectMode(userMsg);
    const apiMessages = [...hist, { role: 'user', content: userMsg }];
    
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 400,
          system: MARA_SYSTEM_PROMPT + `\n\nCurrent detected mode: ${mode.toUpperCase()}`,
          messages: apiMessages
        })
      });
      const data = await response.json();
      if (data.content?.[0]) return data.content[0].text;
      throw new Error(data.error?.message || 'API error');
    } catch (error) {
      console.error('Claude API error:', error);
      return null;
    }
  };

  const send = async (text, fromModal = false) => {
    if (!text?.trim() || loading) return;
    
    const userMsg = text.trim();
    const lower = userMsg.toLowerCase();
    
    if (lower.includes('everything') || lower.includes('all image') || lower.includes('browse') || lower.includes('scroll') || lower.includes('gallery') || lower.includes('show me all') || lower.includes('see all')) {
      setMessages(m => [...m, 
        { role: 'user', text: userMsg },
        { role: 'assistant', text: "Here's our full collection — tap any to explore.", images: [] }
      ]);
      setShowGallery(true);
      if (fromModal) closeModal();
      return;
    }
    
    setInput('');
    setMessages(m => [...m, { role: 'user', text: userMsg }]);
    setLoading(true);

    const claudeResponse = await callClaude(userMsg, history);
    
    let responseText = '';
    let responseImages = [];
    let responseVideos = [];
    
    if (claudeResponse) {
      responseImages = extractImageTags(claudeResponse);
      responseVideos = extractVideoTags(claudeResponse);
      responseText = cleanResponse(claudeResponse);
      setHistory([...history, 
        { role: 'user', content: userMsg },
        { role: 'assistant', content: claudeResponse }
      ]);
    }
    
    if (!claudeResponse || responseImages.length === 0) {
      responseImages = searchImages(userMsg);
      if (responseImages.length > 0) {
        responseText = responseText || `Here's what I found:`;
      } else {
        responseText = responseText || "What kind of project is this — healthcare, hospitality, corporate, residential?";
        responseImages = [IMAGE_CATALOG.find(i => i.id === 'lax-american'), IMAGE_CATALOG.find(i => i.id === 'buddha-1')];
      }
    }

    setMessages(m => [...m, {
      role: 'assistant',
      text: responseText,
      images: responseImages.slice(0, 2),
      videos: responseVideos.slice(0, 1)
    }]);
    
    setLoading(false);
    if (fromModal) closeModal();
  };

  return (
    <div className="h-screen bg-stone-950 text-stone-100 flex flex-col" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      
      {/* Header */}
      <header className="p-4 border-b border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
            <span className="text-lg font-semibold text-white">M</span>
          </div>
          <div>
            <h1 className="font-semibold text-stone-100">Mara</h1>
            <p className="text-xs text-stone-500">MR Walls Design Expert</p>
          </div>
        </div>
        <button
          onClick={() => setShowGallery(true)}
          className="flex items-center gap-2 px-3 py-2 bg-stone-900 hover:bg-stone-800 rounded-lg border border-stone-700 text-sm text-stone-300"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Browse All
        </button>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[85%]">
              <div className={`rounded-2xl px-4 py-3 ${
                msg.role === 'user' 
                  ? 'bg-stone-700 text-stone-100' 
                  : 'bg-stone-900 border border-stone-800'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              </div>
              
              {/* Videos */}
              {msg.videos && msg.videos.length > 0 && (
                <div className="mt-3">
                  {msg.videos.map((video, j) => (
                    <div key={j} className="rounded-xl overflow-hidden border border-stone-800">
                      <video 
                        src={video.url} 
                        controls 
                        className="w-full"
                        poster=""
                      />
                      <div className="p-2 bg-stone-900">
                        <p className="text-xs text-stone-400">{video.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Images */}
              {msg.images && msg.images.length > 0 && (
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {msg.images.map((img, j) => (
                    <button
                      key={j}
                      onClick={() => handleImageClick(img)}
                      className="relative aspect-[4/3] rounded-xl overflow-hidden border border-stone-800 hover:border-stone-600 transition-all text-left"
                    >
                      <img src={img.image} alt={img.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-sm font-medium text-white truncate">{img.title}</p>
                        <p className="text-xs text-stone-400">{img.sector}</p>
                        {img.isCredibility && <span className="text-[10px] text-amber-400">★ Featured Project</span>}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-stone-900 border border-stone-800 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Input */}
      <footer className="p-4 border-t border-stone-800">
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send(input)}
            placeholder="Ask about patterns, pricing, installation..."
            disabled={loading}
            className="flex-1 px-4 py-3 bg-stone-900 border border-stone-700 rounded-xl text-sm focus:outline-none focus:border-amber-600 disabled:opacity-50"
          />
          <button
            onClick={() => send(input)}
            disabled={loading || !input.trim()}
            className="px-5 py-3 bg-amber-600 text-white rounded-xl font-medium text-sm hover:bg-amber-500 disabled:opacity-50 transition-colors"
          >
            Send
          </button>
        </div>
      </footer>

      {/* FAMILY MODAL */}
      {selectedImage && !specsImage && (
        <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
              <button onClick={() => setShowGallery(true)} className="flex items-center gap-2 px-3 py-2 bg-stone-800 hover:bg-stone-700 rounded-lg text-sm text-stone-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Browse All
              </button>
              <button onClick={closeModal} className="w-10 h-10 bg-stone-800 hover:bg-stone-700 rounded-full flex items-center justify-center text-white">✕</button>
            </div>

            <div className="aspect-video relative rounded-xl overflow-hidden mb-4">
              <img src={selectedImage.image} alt={selectedImage.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="text-lg font-medium">{selectedImage.title}</div>
                <div className="text-sm text-stone-300">{selectedImage.pattern} • {selectedImage.sector}</div>
                {selectedImage.isCredibility && <span className="text-xs text-amber-400">★ Featured Project</span>}
              </div>
            </div>

            <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 mb-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center text-xs font-medium shrink-0 text-white">M</div>
                <div className="flex-1">
                  <p className="text-sm text-stone-300">{selectedImage.description}</p>
                  {selectedImage.specs?.pricePerSF && (
                    <p className="text-sm text-amber-400 mt-1">${selectedImage.specs.pricePerSF}/SF • {selectedImage.specs.leadTime}</p>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <input
                  ref={modalInputRef}
                  placeholder="Ask Mara about this..."
                  className="flex-1 px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-sm focus:outline-none focus:border-amber-600"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      send(e.target.value, true);
                      e.target.value = '';
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (modalInputRef.current?.value.trim()) {
                      send(modalInputRef.current.value, true);
                      modalInputRef.current.value = '';
                    }
                  }}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-500"
                >
                  Ask
                </button>
              </div>
            </div>

            {familyImages.length > 0 && (
              <div className="grid grid-cols-4 gap-3 mb-4">
                {familyImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => handleFamilyClick(img)}
                    className="relative aspect-square rounded-lg overflow-hidden border border-stone-700 hover:border-amber-600 transition-all"
                  >
                    <img src={img.image} alt={img.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-1 left-1 right-1">
                      <p className="text-[10px] text-white truncate">{img.title}</p>
                      {img.corianColor && CORIAN_COLORS[img.corianColor] && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <div className="w-2 h-2 rounded-full border border-white/30" style={{ backgroundColor: CORIAN_COLORS[img.corianColor].hex }} />
                          <span className="text-[8px] text-stone-400">{img.corianColor}</span>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            <button onClick={() => handleFamilyClick(selectedImage)} className="w-full py-3 bg-amber-600 hover:bg-amber-500 rounded-xl text-sm font-medium text-white">
              View Full Specs
            </button>
          </div>
        </div>
      )}

      {/* SPECS MODAL */}
      {specsImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={closeSpecs}>
          <div className="bg-stone-950 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto border border-stone-800" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video relative bg-stone-900">
              <img src={specsImage.image} alt={specsImage.title} className="w-full h-full object-cover" />
              <button onClick={closeSpecs} className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70">✕</button>
            </div>
            
            <div className="p-6">
              <h2 className="text-xl font-semibold text-stone-100 mb-1">{specsImage.title}</h2>
              <p className="text-sm text-stone-400 mb-4">{specsImage.pattern} • {specsImage.sector}</p>
              <p className="text-sm text-stone-300 mb-6">{specsImage.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div><p className="text-xs text-stone-500 uppercase">Material</p><p className="text-sm text-stone-200">{specsImage.specs?.material || 'DuPont Corian®'}</p></div>
                <div><p className="text-xs text-stone-500 uppercase">Color</p><p className="text-sm text-stone-200">{specsImage.corianColor || specsImage.specs?.color}</p></div>
                <div><p className="text-xs text-stone-500 uppercase">Max Panel</p><p className="text-sm text-stone-200">{specsImage.specs?.maxPanel || specsImage.specs?.size || '144" × 60"'}</p></div>
                <div><p className="text-xs text-stone-500 uppercase">Lead Time</p><p className="text-sm text-stone-200">{specsImage.specs?.leadTime}</p></div>
                <div><p className="text-xs text-stone-500 uppercase">System</p><p className="text-sm text-stone-200">{specsImage.specs?.system}</p></div>
                <div><p className="text-xs text-stone-500 uppercase">Price</p><p className="text-sm text-amber-400 font-medium">${specsImage.specs?.pricePerSF}/SF</p></div>
                {specsImage.specs?.enhancement && (
                  <div className="col-span-2"><p className="text-xs text-stone-500 uppercase">Enhancement</p><p className="text-sm text-stone-200">{specsImage.specs.enhancement}</p></div>
                )}
              </div>
              
              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-stone-800 hover:bg-stone-700 rounded-xl font-medium text-sm border border-stone-700">Download Specs</button>
                <button className="flex-1 py-3 bg-amber-600 text-white hover:bg-amber-500 rounded-xl font-medium text-sm">Request Quote</button>
              </div>
              
              {specsImage.shopDrawing && (
                <a href={specsImage.shopDrawing} target="_blank" rel="noopener noreferrer" className="block mt-4 text-center text-sm text-amber-400 hover:text-amber-300 underline">View Shop Drawing →</a>
              )}
              
              <button onClick={closeSpecs} className="mt-4 w-full py-2 text-sm text-stone-500 hover:text-stone-300">← Back</button>
            </div>
          </div>
        </div>
      )}

      {/* GALLERY MODAL */}
      {showGallery && (
        <div className="fixed inset-0 bg-black/95 z-50 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-4">
            <div className="flex items-center justify-between mb-6 sticky top-0 bg-black/80 backdrop-blur-sm py-4 -mx-4 px-4 z-10">
              <div>
                <h2 className="text-xl font-semibold text-stone-100">Full Collection</h2>
                <p className="text-sm text-stone-500">{IMAGE_CATALOG.length} designs • Tap to explore</p>
              </div>
              <button onClick={() => setShowGallery(false)} className="w-10 h-10 bg-stone-800 hover:bg-stone-700 rounded-full flex items-center justify-center text-white">✕</button>
            </div>

            {/* Featured Projects First */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-amber-400 uppercase tracking-wide mb-3">★ Featured Projects</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {IMAGE_CATALOG.filter(img => img.isCredibility).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => { setShowGallery(false); handleImageClick(img); }}
                    className="relative aspect-[4/3] rounded-lg overflow-hidden border border-amber-900/50 hover:border-amber-600 transition-all group"
                  >
                    <img src={img.image} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <p className="text-xs font-medium text-white truncate">{img.title}</p>
                      <span className="text-[10px] text-amber-400">{img.sector}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {Object.entries(getGalleryPatterns()).map(([pattern, images]) => {
              const nonCredibility = images.filter(img => !img.isCredibility);
              if (nonCredibility.length === 0) return null;
              return (
                <div key={pattern} className="mb-8">
                  <h3 className="text-sm font-medium text-stone-400 uppercase tracking-wide mb-3">{pattern}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {nonCredibility.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => { setShowGallery(false); handleImageClick(img); }}
                        className="relative aspect-[4/3] rounded-lg overflow-hidden border border-stone-800 hover:border-stone-600 transition-all group"
                      >
                        <img src={img.image} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-2">
                          <p className="text-xs font-medium text-white truncate">{img.title}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            {img.corianColor && CORIAN_COLORS[img.corianColor] && (
                              <div className="w-2 h-2 rounded-full border border-white/30" style={{ backgroundColor: CORIAN_COLORS[img.corianColor].hex }} />
                            )}
                            <span className="text-[10px] text-stone-400">{img.sector}</span>
                            {img.isBacklit && <span className="text-[10px] text-amber-400 ml-1">✦ Backlit</span>}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
