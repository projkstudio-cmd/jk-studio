const http = require('http');
const fs = require('fs');
const path = require('path');
const ROOT = '/Users/juliettekarbouche/Desktop/Claude/jk-studio';
const types = { '.html':'text/html', '.jpg':'image/jpeg', '.png':'image/png', '.xml':'application/xml', '.txt':'text/plain', '.js':'text/javascript' };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const file = path.join(ROOT, p);
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(4173, () => console.log('serving on 4173'));
