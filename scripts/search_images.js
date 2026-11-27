import https from 'https';
import fs from 'fs';

async function searchCommons(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=8&gsrsearch=${encodeURIComponent(query)}&prop=imageinfo&iiprop=url|size`;
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query ? Object.values(json.query.pages) : [];
          resolve(pages.map(p => ({ title: p.title, url: p.imageinfo?.[0]?.url, w: p.imageinfo?.[0]?.width, h: p.imageinfo?.[0]?.height })));
        } catch(e) { resolve([]); }
      });
    }).on('error', () => resolve([]));
  });
}

async function main() {
  const stat = await searchCommons('stationery branding mockup');
  console.log('stat:', JSON.stringify(stat, null, 2));
  const cards = await searchCommons('business cards mockup');
  console.log('cards:', JSON.stringify(cards, null, 2));
  const pharma = await searchCommons('pharmaceutical packaging boxes medicine');
  console.log('pharma:', JSON.stringify(pharma, null, 2));
}

main();
