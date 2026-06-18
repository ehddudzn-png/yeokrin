const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const dir = "case3";
const outDir = "case3_optimized";
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

fs.readdirSync(dir).filter(f => /\.png$/i.test(f)).forEach(async (f) => {
  const inp = path.join(dir, f);
  const out = path.join(outDir, f);
  const before = fs.statSync(inp).size;
  await sharp(inp)
    .resize({ width: 900, withoutEnlargement: true })   // 가로 900px로 제한
    .png({ quality: 70, compressionLevel: 9, palette: true })  // 강하게 압축
    .toFile(out);
  const after = fs.statSync(out).size;
  console.log(`${f}: ${(before/1024).toFixed(0)}KB -> ${(after/1024).toFixed(0)}KB`);
});
