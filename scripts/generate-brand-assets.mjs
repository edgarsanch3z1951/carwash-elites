import sharp from "sharp";

const src = "public/carwashlogo.jpg";

await sharp(src).resize(32, 32, { fit: "cover" }).png().toFile("app/icon.png");
await sharp(src)
  .resize(180, 180, { fit: "cover" })
  .png()
  .toFile("app/apple-icon.png");
await sharp(src)
  .resize(48, 48, { fit: "cover" })
  .png()
  .toFile("public/favicon.png");

const width = 1200;
const height = 630;
const logoSize = 320;
const logo = await sharp(src)
  .resize(logoSize, logoSize, {
    fit: "contain",
    background: { r: 8, g: 64, b: 32, alpha: 1 },
  })
  .png()
  .toBuffer();

const left = Math.round((width - logoSize) / 2);
const top = Math.round((height - logoSize) / 2 - 20);

const svgText = Buffer.from(`
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#084020"/>
  <circle cx="180" cy="120" r="48" fill="#70a8b0" fill-opacity="0.18"/>
  <circle cx="1040" cy="520" r="70" fill="#70a8b0" fill-opacity="0.16"/>
  <circle cx="980" cy="140" r="28" fill="#ffffff" fill-opacity="0.08"/>
  <text x="50%" y="560" text-anchor="middle" font-family="Arial, sans-serif" font-size="36" font-weight="700" fill="#ffffff">Mobile Detailing · Ventura County</text>
</svg>
`);

await sharp(svgText)
  .composite([{ input: logo, left, top }])
  .jpeg({ quality: 88 })
  .toFile("public/og-image.jpg");

console.log(
  "Generated app/icon.png, app/apple-icon.png, public/favicon.png, public/og-image.jpg",
);
