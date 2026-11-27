const https = require('https');
const fs = require('fs');

async function searchWikimedia(srsearch) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srnamespace=6&srlimit=8&srsearch=${encodeURIComponent(srsearch)}&format=json`;
  return new Promise(resolve => {
    https.get(url, { headers: { 'User-Agent': 'ManishaGraphixBot/1.0 (contact@example.com)' } }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.query.search.map(s => s.title));
        } catch(e) { resolve([]); }
      });
    }).on('error', () => resolve([]));
  });
}

async function getImageInfo(titles) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(titles.join('|'))}&prop=imageinfo&iiprop=url|size&format=json`;
  return new Promise(resolve => {
    https.get(url, { headers: { 'User-Agent': 'ManishaGraphixBot/1.0 (contact@example.com)' } }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = Object.values(json.query.pages);
          resolve(pages.map(p => ({ title: p.title, url: p.imageinfo?.[0]?.url, w: p.imageinfo?.[0]?.width, h: p.imageinfo?.[0]?.height })));
        } catch(e) { resolve([]); }
      });
    }).on('error', () => resolve([]));
  });
}

async function run() {
  const terms = ['"business cards"', '"wedding invitation"', '"medicine boxes"', '"hardcover books"'];
  for (const t of terms) {
    const titles = await searchWikimedia(t);
    const infos = await getImageInfo(titles.filter(x => !x.endsWith('.pdf') && !x.endsWith('.svg')));
    console.log(t, infos.filter(x => x.url));
  }
}

run();
