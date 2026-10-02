// All marketplace content lives here. Swap these sample records for a CMS or database later.

export type ArtKind =
  | "fashion"
  | "shoe"
  | "interior"
  | "arch"
  | "jewel"
  | "furniture"
  | "objects"
  | "textile";

export type Shape = "tall" | "square" | "wide";

export type Palette = { bg: string; a: string; b: string; c: string; ink: string };

export type Discipline = {
  slug: string;
  name: string;
  short: string;
  kind: ArtKind;
  accent: string; // light theme accent
  accentDark: string; // dark theme accent
  headline: string;
  blurb: string;
  tags: string[];
  briefPrompts: string[];
  unit: string; // the measure people in this field talk in
};

export type Designer = {
  id: string;
  name: string;
  city: string;
  country: string;
  discipline: string; // discipline slug
  role: string;
  bio: string;
  rate: string;
  reply: string;
  since: number;
  color: string;
  open: boolean;
};

export type Work = {
  id: string;
  designer: string;
  title: string;
  shape: Shape;
  seed: number;
  pal: Palette;
  spec: string;
  year: number;
  tags: string[];
  about: string;
  specs: [string, string][];
};

export const DISCIPLINES: Discipline[] = [
  {
    slug: "sustainable-fashion",
    name: "Sustainable Fashion",
    short: "Fashion",
    kind: "fashion",
    accent: "#B4462F",
    accentDark: "#F08A6E",
    headline: "Clothes cut to last, from people who sew them.",
    blurb:
      "Slow fashion labels, handloom specialists and upcycling studios. Commission a capsule, a bridal look or a small production run.",
    tags: ["Handloom", "Upcycled", "Bridal", "Zero waste"],
    briefPrompts: ["A bridal look I can wear again", "A 6-piece capsule wardrobe", "Small run for my label"],
    unit: "GSM",
  },
  {
    slug: "footwear",
    name: "Sneakers & Footwear",
    short: "Footwear",
    kind: "shoe",
    accent: "#3B5B3A",
    accentDark: "#9DC79A",
    headline: "Lasts, soles and uppers, made to order.",
    blurb:
      "Custom sneakers, hand-welted shoes and small-batch footwear. Find designers who can take a sketch to a sampled pair.",
    tags: ["Custom sneakers", "Goodyear welt", "Recycled soles", "Production"],
    briefPrompts: ["A custom pair for my wedding", "A sneaker for my brand", "Resole-able everyday shoes"],
    unit: "mm",
  },
  {
    slug: "interior-design",
    name: "Interior Design",
    short: "Interiors",
    kind: "interior",
    accent: "#8A5A24",
    accentDark: "#E2B272",
    headline: "Rooms that feel finished on the first morning.",
    blurb:
      "Warm minimal homes, Japandi flats, cafés and boutique stays. Hire for a single room or a full renovation with site visits.",
    tags: ["Warm minimal", "Japandi", "Hospitality", "Small spaces"],
    briefPrompts: ["Redo our living room", "Fit out a 40-seat café", "Make a 1BHK feel bigger"],
    unit: "sq ft",
  },
  {
    slug: "architecture",
    name: "Residential Architecture",
    short: "Architecture",
    kind: "arch",
    accent: "#2E4A6B",
    accentDark: "#8FB3DA",
    headline: "Houses drawn around how you actually live.",
    blurb:
      "Independent architects for homes, extensions and renovations. Climate-first plans, courtyards and honest materials.",
    tags: ["New homes", "Renovation", "Courtyard", "Climate-first"],
    briefPrompts: ["A house on our plot", "Add a floor to our home", "Renovate an old apartment"],
    unit: "m²",
  },
  {
    slug: "jewellery",
    name: "Fine Jewellery",
    short: "Jewellery",
    kind: "jewel",
    accent: "#7A5A12",
    accentDark: "#E8C66A",
    headline: "Rings and heirlooms, set by the hand that drew them.",
    blurb:
      "Engagement rings, recycled gold and redesigned family pieces. Talk to the maker, see the CAD, then the wax, then the ring.",
    tags: ["Engagement", "Recycled gold", "Lab-grown", "Redesign"],
    briefPrompts: ["An engagement ring", "Reset my grandmother's stone", "Matching wedding bands"],
    unit: "ct",
  },
  {
    slug: "furniture",
    name: "Furniture & Lighting",
    short: "Furniture",
    kind: "furniture",
    accent: "#6B3F2A",
    accentDark: "#D9A07F",
    headline: "Chairs, tables and lamps built for one room.",
    blurb:
      "Studio furniture makers and lighting designers. Commission a dining table to size or a run of chairs for a restaurant.",
    tags: ["Solid wood", "Lighting", "Upholstery", "Made to size"],
    briefPrompts: ["A dining table for 8", "Lounge chairs for our lobby", "Pendant lights for a café"],
    unit: "mm",
  },
  {
    slug: "ceramics",
    name: "Ceramics & Objects",
    short: "Ceramics",
    kind: "objects",
    accent: "#55663F",
    accentDark: "#B4C88F",
    headline: "Thrown, glazed and fired in small batches.",
    blurb:
      "Potters and object makers for tableware, vases and restaurant sets. Order a set or commission a glaze of your own.",
    tags: ["Tableware", "Vessels", "Restaurant sets", "Glaze"],
    briefPrompts: ["Plates for my restaurant", "A wedding gift set", "Vases for a hotel lobby"],
    unit: "cone",
  },
  {
    slug: "textiles",
    name: "Textiles & Rugs",
    short: "Textiles",
    kind: "textile",
    accent: "#3A2F6B",
    accentDark: "#ADA3EE",
    headline: "Woven, dyed and knotted for a specific wall or floor.",
    blurb:
      "Weavers, dyers and rug makers. Commission a runner to length, a hanging for a lobby or yardage for upholstery.",
    tags: ["Handwoven", "Natural dye", "Rugs", "Wall pieces"],
    briefPrompts: ["A rug for our living room", "Upholstery fabric", "A lobby wall hanging"],
    unit: "EPI",
  },
];

export const DESIGNERS: Designer[] = [
  { id: "meera-raghavan", name: "Meera Raghavan", city: "Jaipur", country: "India", discipline: "sustainable-fashion", role: "Handloom womenswear and bridal", bio: "Meera works with weaving clusters in Kota and Chanderi and cuts every pattern to leave almost nothing on the floor.", rate: "From ₹60,000", reply: "Replies in about a day", since: 2018, color: "#A0442F", open: true },
  { id: "chloe-martin", name: "Chloé Martin", city: "Paris", country: "France", discipline: "sustainable-fashion", role: "Upcycled tailoring", bio: "Chloé rebuilds deadstock suiting and vintage coats into new tailoring, one size run at a time.", rate: "From €900", reply: "Replies in 2 days", since: 2020, color: "#5B4A6E", open: true },
  { id: "lena-vogt", name: "Lena Vogt", city: "Berlin", country: "Germany", discipline: "footwear", role: "Made-to-order footwear", bio: "Lena builds welted shoes on her own lasts and designs small sneaker runs for independent labels.", rate: "From €650", reply: "Replies in about a day", since: 2016, color: "#2F2F38", open: true },
  { id: "dami-adeyemi", name: "Dami Adeyemi", city: "London", country: "UK", discipline: "footwear", role: "Custom sneakers", bio: "Dami reworks and hand-paints sneakers for weddings, artists and limited drops.", rate: "From £320", reply: "Replies same day", since: 2021, color: "#B05A2E", open: true },
  { id: "kabir-sethi", name: "Kabir Sethi", city: "Hyderabad", country: "India", discipline: "interior-design", role: "Warm minimal homes and cafés", bio: "Kabir designs homes and small cafés with lime plaster, local stone and furniture built on site.", rate: "From ₹1,20,000", reply: "Replies same day", since: 2017, color: "#8A6A2F", open: true },
  { id: "sofia-marin", name: "Sofía Marín", city: "Mexico City", country: "Mexico", discipline: "interior-design", role: "Hospitality interiors", bio: "Sofía designs cafés, bars and boutique stays where colour and terrazzo do most of the talking.", rate: "From $3,800", reply: "Replies same day", since: 2015, color: "#B0603A", open: false },
  { id: "tomas-ferreira", name: "Tomás Ferreira", city: "Lisbon", country: "Portugal", discipline: "architecture", role: "Small residential architecture", bio: "Tomás designs courtyard houses and careful renovations on tight Lisbon plots.", rate: "From €4,500", reply: "Replies in 2 days", since: 2012, color: "#3E5D7A", open: true },
  { id: "arjun-pillai", name: "Arjun Pillai", city: "Kochi", country: "India", discipline: "architecture", role: "Climate-first houses", bio: "Arjun builds laterite and lime homes with deep verandahs that stay cool without air conditioning.", rate: "From ₹2,50,000", reply: "Replies in about a day", since: 2014, color: "#2F6B5E", open: true },
  { id: "isha-kapoor", name: "Isha Kapoor", city: "Mumbai", country: "India", discipline: "jewellery", role: "Engagement rings and redesigns", bio: "Isha casts in recycled gold and resets family stones into pieces people wear every day.", rate: "From ₹85,000", reply: "Replies same day", since: 2019, color: "#7A5A12", open: true },
  { id: "maren-holt", name: "Maren Holt", city: "Copenhagen", country: "Denmark", discipline: "furniture", role: "Furniture and lighting", bio: "Maren makes chairs, tables and paper-shade lamps in oak and ash from a small workshop in Nordvest.", rate: "From DKK 9,000", reply: "Replies in 2 days", since: 2013, color: "#6B3F2A", open: true },
  { id: "aiko-mori", name: "Aiko Mori", city: "Kyoto", country: "Japan", discipline: "ceramics", role: "Wheel-thrown ceramics", bio: "Aiko throws stoneware for restaurants and fires with wood ash glazes she mixes herself.", rate: "From ¥80,000", reply: "Replies in 3 days", since: 2011, color: "#6C7A4E", open: true },
  { id: "ifeoma-okafor", name: "Ifeoma Okafor", city: "Lagos", country: "Nigeria", discipline: "textiles", role: "Handwoven and dyed textiles", bio: "Ifeoma strip-weaves aso-oke and dyes adire with indigo for interiors and fashion houses.", rate: "From ₦450,000", reply: "Replies in 2 days", since: 2016, color: "#3A2F6B", open: true },
];

export const WORKS: Work[] = [
  // Sustainable fashion
  { id: "monsoon-bridal-capsule", designer: "meera-raghavan", title: "Monsoon Bridal Capsule", shape: "tall", seed: 11, pal: { bg: "#E9D9C8", a: "#B5482E", b: "#E7B04A", c: "#6E2A1D", ink: "#3A1A12" }, spec: "Kota silk · 6 looks", year: 2026, tags: ["Bridal", "Handloom"], about: "A six-look bridal capsule in handloom Kota silk, with removable dupatta panels so every piece can be worn again after the wedding.", specs: [["Material", "Kota silk, 60 GSM"], ["Pieces", "6 looks, 14 garments"], ["Lead time", "10–12 weeks"], ["Sizing", "Made to measure"]] },
  { id: "khadi-workwear-set", designer: "meera-raghavan", title: "Khadi Workwear Set", shape: "square", seed: 15, pal: { bg: "#DCE1E8", a: "#2D3F73", b: "#EFE8DA", c: "#1C2A50", ink: "#16203D" }, spec: "Khadi denim · 3 pieces", year: 2025, tags: ["Handloom", "Zero waste"], about: "A jacket, shirt and wide trouser in hand-spun khadi denim, patterned to cut with almost no waste.", specs: [["Material", "Khadi denim, 9 oz"], ["Pieces", "3"], ["Lead time", "4 weeks"], ["Sizing", "XS–XXL and custom"]] },
  { id: "deadstock-blazer", designer: "chloe-martin", title: "Deadstock Wool Blazer", shape: "tall", seed: 41, pal: { bg: "#E4E0E8", a: "#4A4060", b: "#C9B7D6", c: "#2A2338", ink: "#221C2E" }, spec: "Deadstock wool · run of 24", year: 2026, tags: ["Upcycled", "Zero waste"], about: "A soft-shouldered blazer cut from deadstock wool suiting found in a Lyon mill, made in a numbered run of 24.", specs: [["Material", "Deadstock wool, 280 GSM"], ["Run", "24 numbered pieces"], ["Lead time", "3 weeks"], ["Sizing", "34–46 EU"]] },
  { id: "block-print-kurtas", designer: "meera-raghavan", title: "Block-Print Kurta Edit", shape: "wide", seed: 29, pal: { bg: "#F0E6DA", a: "#C0563F", b: "#2F5D50", c: "#F7EFE4", ink: "#3B2018" }, spec: "Sanganeri print · 8 styles", year: 2026, tags: ["Handloom"], about: "Eight everyday kurtas in Sanganeri hand block prints, with deep pockets and side vents cut for movement.", specs: [["Material", "Cotton mul, block printed"], ["Styles", "8"], ["Lead time", "6 weeks"], ["Minimum order", "20 pieces per style"]] },

  // Footwear
  { id: "last-no-7-derby", designer: "lena-vogt", title: "Last No. 7 Derby", shape: "wide", seed: 5, pal: { bg: "#E3E3E6", a: "#2E2B33", b: "#A2805A", c: "#D9D3C7", ink: "#1E1D22" }, spec: "Calf leather · EU 36–46", year: 2026, tags: ["Goodyear welt"], about: "An unlined derby built on a rounded last, Goodyear welted so it can be resoled for years.", specs: [["Upper", "Vegetable-tanned calf"], ["Construction", "Goodyear welt"], ["Sizes", "EU 36–46, half sizes"], ["Lead time", "6 weeks"]] },
  { id: "field-runner", designer: "lena-vogt", title: "Field Runner", shape: "square", seed: 8, pal: { bg: "#E2E6DE", a: "#55704F", b: "#E7E0CF", c: "#2C3A2A", ink: "#1F2A1E" }, spec: "Suede · recycled sole", year: 2026, tags: ["Recycled soles", "Production"], about: "A low trainer in waxed suede with a sole made from recycled rubber offcuts, designed for a small Berlin label.", specs: [["Upper", "Waxed suede"], ["Sole", "Recycled rubber"], ["Sizes", "EU 37–45"], ["Run", "Production of 400 pairs"]] },
  { id: "sunset-court-custom", designer: "dami-adeyemi", title: "Sunset Court Custom", shape: "tall", seed: 52, pal: { bg: "#F1E3D6", a: "#D9632E", b: "#2B2B6E", c: "#F7F1E8", ink: "#2A1A12" }, spec: "Hand-painted leather · 1 pair", year: 2026, tags: ["Custom sneakers"], about: "A one-off pair painted for a wedding party, with the couple's initials stitched into the heel tab.", specs: [["Base", "White leather court"], ["Finish", "Flexible leather paint, sealed"], ["Lead time", "2 weeks"], ["Edition", "One pair"]] },

  // Interiors
  { id: "banjara-hills-living", designer: "kabir-sethi", title: "Banjara Hills Living Room", shape: "tall", seed: 31, pal: { bg: "#E8DCCB", a: "#5F6B4E", b: "#C58B4E", c: "#F2E9DC", ink: "#3A3226" }, spec: "Elevation · 420 sq ft", year: 2026, tags: ["Warm minimal"], about: "A family living room rebuilt around one long arched window, lime-plaster walls and a low sofa built into the bay.", specs: [["Area", "420 sq ft"], ["Finishes", "Lime plaster, teak, jute"], ["Duration", "9 weeks on site"], ["Scope", "Design and site supervision"]] },
  { id: "cafe-jacaranda", designer: "sofia-marin", title: "Café Jacaranda", shape: "wide", seed: 62, pal: { bg: "#E9D3C4", a: "#8F4A6B", b: "#D97C4A", c: "#F5E6DA", ink: "#3D2230" }, spec: "Elevation · 64 covers", year: 2025, tags: ["Hospitality"], about: "A neighbourhood café in Roma Norte with a terrazzo counter, built-in banquettes and a ceiling washed in jacaranda pink.", specs: [["Covers", "64 seats"], ["Finishes", "Terrazzo, oak, lime wash"], ["Duration", "14 weeks"], ["Scope", "Interior design and FF&E"]] },
  { id: "gachibowli-studio-kitchen", designer: "kabir-sethi", title: "Studio Kitchen, Gachibowli", shape: "square", seed: 36, pal: { bg: "#DFE3DE", a: "#3C5A57", b: "#D7A35E", c: "#F1EEE6", ink: "#24302E" }, spec: "Elevation · 160 sq ft", year: 2025, tags: ["Small spaces", "Japandi"], about: "A compact kitchen for a two-person flat: sage cabinetry, brass rail lighting and a fold-down breakfast counter.", specs: [["Area", "160 sq ft"], ["Finishes", "Lacquer, brass, Kota stone"], ["Duration", "4 weeks"], ["Scope", "Design and joinery drawings"]] },

  // Architecture
  { id: "casa-do-patio", designer: "tomas-ferreira", title: "Casa do Pátio", shape: "square", seed: 23, pal: { bg: "#E6E9EC", a: "#20334A", b: "#C9D3DD", c: "#7C93AB", ink: "#20334A" }, spec: "Plan 1:100 · 142 m²", year: 2025, tags: ["New homes", "Courtyard"], about: "A single-storey courtyard house on a narrow Lisbon plot. Every room opens to the central patio for cross ventilation and morning light.", specs: [["Area", "142 m²"], ["Site", "Narrow urban plot, 8 m frontage"], ["Stage", "Built, 2025"], ["Scope", "Concept to construction drawings"]] },
  { id: "laterite-house", designer: "arjun-pillai", title: "Laterite House", shape: "tall", seed: 58, pal: { bg: "#EDE6DE", a: "#7A3B26", b: "#E3CDBA", c: "#B87355", ink: "#4A2618" }, spec: "Plan 1:100 · 195 m²", year: 2026, tags: ["New homes", "Climate-first"], about: "A two-generation home in laterite stone with deep verandahs, built to stay cool through Kerala summers without air conditioning.", specs: [["Area", "195 m²"], ["Material", "Laterite, lime, reclaimed teak"], ["Stage", "Under construction"], ["Scope", "Full architectural services"]] },
  { id: "alfama-loft", designer: "tomas-ferreira", title: "Alfama Studio Loft", shape: "wide", seed: 77, pal: { bg: "#ECE9E2", a: "#2B2B2B", b: "#D8D2C4", c: "#9A8F7A", ink: "#2B2B2B" }, spec: "Plan 1:50 · 58 m²", year: 2024, tags: ["Renovation"], about: "A top-floor loft in a 19th-century building, opened into one room with a sleeping mezzanine.", specs: [["Area", "58 m²"], ["Stage", "Built, 2024"], ["Structure", "Retained timber floors"], ["Scope", "Renovation design"]] },

  // Jewellery
  { id: "solitaire-in-recycled-gold", designer: "isha-kapoor", title: "Six-Claw Solitaire", shape: "square", seed: 13, pal: { bg: "#EFE8DC", a: "#C9A04A", b: "#F7F4EE", c: "#8C6A22", ink: "#3A2C10" }, spec: "18k recycled gold · 1.2 ct", year: 2026, tags: ["Engagement", "Recycled gold", "Lab-grown"], about: "A six-claw solitaire with a lab-grown 1.2 ct round brilliant, set low so it sits close to the finger.", specs: [["Metal", "18k recycled yellow gold"], ["Stone", "1.2 ct lab-grown, round brilliant"], ["Lead time", "4–5 weeks"], ["Sizing", "Any size, one resize free"]] },
  { id: "heirloom-reset", designer: "isha-kapoor", title: "Grandmother's Emerald, Reset", shape: "tall", seed: 27, pal: { bg: "#E4EAE4", a: "#B8B8B8", b: "#2E7D5B", c: "#6A6A6A", ink: "#1F2A24" }, spec: "Platinum · 0.9 ct emerald", year: 2025, tags: ["Redesign"], about: "A family emerald taken out of a worn 1960s setting and reset in a slim platinum bezel for daily wear.", specs: [["Metal", "Platinum 950"], ["Stone", "0.9 ct emerald, client's own"], ["Lead time", "3 weeks"], ["Process", "CAD, wax, cast, set"]] },
  { id: "stacking-bands", designer: "isha-kapoor", title: "Hammered Stacking Bands", shape: "wide", seed: 33, pal: { bg: "#ECE4DA", a: "#D4A86A", b: "#E9C9B4", c: "#9C7442", ink: "#3A2A18" }, spec: "14k gold · set of 3", year: 2026, tags: ["Recycled gold"], about: "Three hammered bands in yellow, rose and white gold, made to be worn together or apart.", specs: [["Metal", "14k recycled gold, three tones"], ["Width", "1.8 mm each"], ["Lead time", "2 weeks"], ["Sizing", "Any size"]] },

  // Furniture
  { id: "ash-lounge-chair", designer: "maren-holt", title: "Ash Lounge Chair", shape: "square", seed: 17, pal: { bg: "#ECE6DC", a: "#C7A57A", b: "#5B6B57", c: "#8E6B45", ink: "#2E2418" }, spec: "Solid ash · seat 380 mm", year: 2026, tags: ["Solid wood", "Upholstery"], about: "A low lounge chair in steam-bent ash with a loose wool cushion, built in batches of ten.", specs: [["Timber", "European ash, oiled"], ["Seat height", "380 mm"], ["Upholstery", "Wool bouclé"], ["Lead time", "8 weeks"]] },
  { id: "paper-pendant", designer: "maren-holt", title: "Paper Pendant No. 3", shape: "tall", seed: 21, pal: { bg: "#E9E7E1", a: "#F3EEE2", b: "#C9A87A", c: "#7D7466", ink: "#2C2A25" }, spec: "Washi + oak · Ø 520 mm", year: 2025, tags: ["Lighting"], about: "A wide washi-paper pendant on an oak ring, designed for long dining tables and café counters.", specs: [["Shade", "Washi paper on oak ring"], ["Diameter", "520 mm"], ["Bulb", "E27 LED, 2700K"], ["Lead time", "5 weeks"]] },
  { id: "oak-dining-table", designer: "maren-holt", title: "Oak Table for Eight", shape: "wide", seed: 38, pal: { bg: "#E8E2D6", a: "#B58A57", b: "#E0CDB0", c: "#7A5734", ink: "#2C2014" }, spec: "White oak · 2400 mm", year: 2026, tags: ["Solid wood", "Made to size"], about: "A trestle dining table in white oak, made to the client's room with a 2400 mm top that seats eight.", specs: [["Timber", "White oak, soap finish"], ["Top", "2400 × 950 mm"], ["Seats", "8"], ["Lead time", "10 weeks"]] },

  // Ceramics
  { id: "ash-glaze-vessels", designer: "aiko-mori", title: "Ash Glaze Vessels", shape: "wide", seed: 7, pal: { bg: "#E4E1D8", a: "#7D8A63", b: "#C9C2A8", c: "#4F5A3C", ink: "#2E3324" }, spec: "Stoneware · cone 10", year: 2026, tags: ["Vessels", "Glaze"], about: "Three wheel-thrown stoneware vessels with a wood-ash glaze that pools green where it runs thick.", specs: [["Clay", "Shigaraki stoneware"], ["Firing", "Cone 10, reduction"], ["Edition", "Sets of 3, 20 sets"], ["Heights", "120, 190, 260 mm"]] },
  { id: "tea-bowl-series", designer: "aiko-mori", title: "Tea Bowl Series", shape: "square", seed: 19, pal: { bg: "#DDD8D2", a: "#9A5A3C", b: "#3B2D27", c: "#C9B8A6", ink: "#2A201B" }, spec: "Shino glaze · 12 bowls", year: 2025, tags: ["Tableware", "Glaze"], about: "Twelve tea bowls in a carbon-trap shino, each fired in a different spot of the kiln so no two match.", specs: [["Clay", "Iron-rich stoneware"], ["Glaze", "Carbon-trap shino"], ["Edition", "12 unique bowls"], ["Diameter", "110–125 mm"]] },
  { id: "omakase-set", designer: "aiko-mori", title: "Omakase Counter Set", shape: "tall", seed: 64, pal: { bg: "#E2E0DA", a: "#3E4A52", b: "#D9D2C2", c: "#8A7A63", ink: "#22282C" }, spec: "Stoneware · 140 pieces", year: 2026, tags: ["Restaurant sets", "Tableware"], about: "A 140-piece set for a ten-seat omakase counter: plates, sake cups and small dishes in one slate glaze.", specs: [["Pieces", "140"], ["Glaze", "Slate matte"], ["Lead time", "12 weeks"], ["Care", "Dishwasher safe"]] },

  // Textiles
  { id: "indigo-aso-oke-runner", designer: "ifeoma-okafor", title: "Indigo Aso-Oke Runner", shape: "square", seed: 44, pal: { bg: "#E7E2DA", a: "#23305E", b: "#C46A3C", c: "#E9D7B5", ink: "#1A2040" }, spec: "Hand-loomed · 3.2 m", year: 2025, tags: ["Handwoven", "Natural dye", "Rugs"], about: "A long runner woven in strips on a narrow loom, dyed in natural indigo, with rust weft floats picked by hand.", specs: [["Fibre", "Cotton, natural indigo"], ["Size", "0.45 × 3.2 m"], ["Technique", "Strip-woven aso-oke"], ["Lead time", "5 weeks"]] },
  { id: "adire-wall-hanging", designer: "ifeoma-okafor", title: "Adire Wall Hanging", shape: "tall", seed: 91, pal: { bg: "#E5E1E8", a: "#3B2F6B", b: "#E3C46A", c: "#F0E9F2", ink: "#241C45" }, spec: "Resist-dyed cotton · 1.4 m", year: 2026, tags: ["Natural dye", "Wall pieces"], about: "A resist-dyed wall hanging made with cassava paste, drawn freehand and dyed in four indigo baths.", specs: [["Fibre", "Cotton, cassava resist"], ["Size", "0.9 × 1.4 m"], ["Technique", "Adire eleko"], ["Lead time", "3 weeks"]] },
  { id: "lobby-weave", designer: "ifeoma-okafor", title: "Lobby Weave in Rust", shape: "wide", seed: 73, pal: { bg: "#EDE4DA", a: "#A2492A", b: "#2D2A4A", c: "#EBD3B0", ink: "#2A1A12" }, spec: "Wool + cotton · 2.4 m", year: 2026, tags: ["Handwoven", "Wall pieces"], about: "A large wall weave for a hotel lobby, built from 12 strips joined by hand so it could be carried in pieces.", specs: [["Fibre", "Wool weft, cotton warp"], ["Size", "2.4 × 1.6 m"], ["Strips", "12"], ["Lead time", "8 weeks"]] },
];

/* ---------- helpers ---------- */
export const getDiscipline = (slug: string) => DISCIPLINES.find((d) => d.slug === slug)!;
export const getDesigner = (id: string) => DESIGNERS.find((d) => d.id === id)!;
export const getWork = (id: string) => WORKS.find((w) => w.id === id)!;
export const disciplineOfWork = (w: Work) => getDiscipline(getDesigner(w.designer).discipline);
export const worksByDiscipline = (slug: string) => WORKS.filter((w) => getDesigner(w.designer).discipline === slug);
export const worksByDesigner = (id: string) => WORKS.filter((w) => w.designer === id);
export const designersByDiscipline = (slug: string) => DESIGNERS.filter((d) => d.discipline === slug);
export const initials = (n: string) =>
  n.split(/\s+/).filter(Boolean).slice(0, 2).map((x) => x[0]).join("").toUpperCase();
