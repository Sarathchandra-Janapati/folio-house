// Photography and video. Photos are from Unsplash (Unsplash License), videos from Pexels/Mixkit (free licences).
// Every image falls back to the generated trade drawing if it fails to load.
// To self-host: download each file into /public/media and point these entries at "/media/<file>".

type PhotoRef = { id: string; credit?: string; page?: string };

export const PHOTOS: Record<string, PhotoRef> = {
  "monsoon-bridal-capsule": { id: "photo-1698657169196-29b4783810c2", credit: "Squade Arrow" },
  "khadi-workwear-set": { id: "photo-1708523842501-1619478cea1f", credit: "" },
  "deadstock-blazer": { id: "photo-1707678831139-df211e77f916", credit: "Amin Zabardast" },
  "last-no-7-derby": { id: "photo-1548764703-22c55cbd8210", credit: "Cassidy Mills" },
  "field-runner": { id: "photo-1705997696539-a4f44e80d9fb", credit: "YASH18" },
  "sunset-court-custom": { id: "photo-1755389462656-5f5e01f79765", credit: "Danny Greenberg" },
  "banjara-hills-living": { id: "photo-1758972581344-85dd3ccb10db", credit: "SUHER DAA" },
  "cafe-jacaranda": { id: "photo-1755004487255-d1e50f0b3914", credit: "Ainur Iman" },
  "gachibowli-studio-kitchen": { id: "photo-1762417508868-162819fd66ee", credit: "Smart Renovations" },
  "casa-do-patio": { id: "photo-1668532043381-b242ff52b8a9", credit: "Ries Bosch" },
  "laterite-house": { id: "photo-1783334418852-0b86d67d4c01", credit: "Patrick PETIT" },
  "alfama-loft": { id: "photo-1783990349147-906f62b882c1", credit: "ULISES RAMIREZ" },
  "solitaire-in-recycled-gold": { id: "photo-1737498205249-b075c65b7b32", credit: "Erin Palos" },
  "heirloom-reset": { id: "photo-1764315974938-0b6807e9510f", credit: "yan kolesnyk" },
  "stacking-bands": { id: "photo-1674275552496-5327af426de2", credit: "Sean Musil" },
  "ash-lounge-chair": { id: "photo-1750306957114-ba6deb1eaa9f", credit: "ObjectType RAW" },
  "paper-pendant": { id: "photo-1709453569035-7d78d3f303de", credit: "Kelsey He" },
  "oak-dining-table": { id: "photo-1536436967234-f5f99a9b7372", credit: "Lina Castaneda" },
  "ash-glaze-vessels": { id: "photo-1597696929736-6d13bed8e6a8", credit: "Chloe Bolton" },
  "tea-bowl-series": { id: "photo-1753617868081-a0ff513695a5", credit: "Zed Can" },
  "omakase-set": { id: "photo-1611143669185-af224c5e3252", credit: "Jakub Dziubak" },
  "indigo-aso-oke-runner": { id: "photo-1775310789283-6d2c31b5ff25", credit: "Leo Liu" },
  "adire-wall-hanging": { id: "photo-1646282998141-8e038879b7c8", credit: "Alexandra Tran" },
};

export const VIDEOS: Record<string, string> = {
  hero: "https://videos.pexels.com/video-files/12690282/12690282-uhd_2560_1440_24fps.mp4",
  "sustainable-fashion": "https://videos.pexels.com/video-files/7140213/7140213-uhd_1440_2560_24fps.mp4",
  footwear: "https://videos.pexels.com/video-files/17661984/17661984-hd_1920_1080_24fps.mp4",
  "interior-design": "https://videos.pexels.com/video-files/35801802/15178302_1440_2560_30fps.mp4",
  architecture: "https://videos.pexels.com/video-files/7578552/7578552-uhd_2560_1440_30fps.mp4",
  jewellery: "https://videos.pexels.com/video-files/6263174/6263174-uhd_2560_1440_25fps.mp4",
  furniture: "https://videos.pexels.com/video-files/5972117/5972117-uhd_2560_1440_25fps.mp4",
  ceramics: "https://videos.pexels.com/video-files/12690282/12690282-uhd_2560_1440_24fps.mp4",
  textiles: "https://videos.pexels.com/video-files/13752603/13752603-hd_1920_1080_60fps.mp4",
};

export const VIDEO_CREDITS: Record<string, string> = {
  "sustainable-fashion": "https://www.pexels.com/video/person-using-sewing-machine-7140213/",
  ceramics: "https://www.pexels.com/video/person-making-a-clay-pot-with-a-pottery-wheel-12690282/",
  "interior-design": "https://www.pexels.com/video/modern-minimalist-kitchen-with-sunlight-35801802/",
  jewellery: "https://www.pexels.com/video/jeweler-working-on-a-ring-6263174/",
  textiles: "https://www.pexels.com/video/close-up-of-weaving-13752603/",
  furniture: "https://www.pexels.com/video/a-man-polishing-wood-5972117/",
  footwear: "https://www.pexels.com/video/a-man-is-working-on-a-shoe-in-a-kitchen-17661984/",
  architecture: "https://www.pexels.com/video/video-of-a-house-interior-7578552/",
};

export function photoFor(workId: string, w = 1200): string | null {
  const p = PHOTOS[workId];
  if (!p) return null;
  if (p.id.startsWith("/")) return p.id;
  return `https://images.unsplash.com/${p.id}?auto=format&fit=crop&w=${w}&q=78`;
}

export const videoFor = (key: string): string | undefined => VIDEOS[key];
