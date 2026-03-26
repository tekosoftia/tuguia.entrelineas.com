import {execSync} from 'child_process';
import express from 'express';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const staticDir = path.join(__dirname, 'build');

/** `build/` no va a git; si Hostinger solo ejecuta `node server.js`, hay que generar el frontend aquí. */
function ensureBuild() {
  const indexHtml = path.join(staticDir, 'index.html');
  if (fs.existsSync(indexHtml)) return;
  console.warn('[server] No hay build/; ejecutando npm run build...');
  execSync('npm run build', {stdio: 'inherit', cwd: __dirname, env: process.env});
}

ensureBuild();

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.static(staticDir));

app.get(/.*/, (_req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on ${port}`);
});
