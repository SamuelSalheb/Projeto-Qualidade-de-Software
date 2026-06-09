
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { dndService } from './services/dndService';

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = path.resolve(__dirname, '../data.json');

type DB = { characters: any[]; monsters: any[]; builds: any[]; reviews: any[]; campaigns: any[] };

function loadDB(): DB {
  if (!fs.existsSync(DB_FILE)) {
    const initial = { characters: [], monsters: [], builds: [], reviews: [], campaigns: [] };
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2));
    return initial;
  }
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}
function saveDB(db: DB) { fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2)); }
const id = () => Date.now().toString();

function crudRoutes(route: string, key: keyof DB) {
  app.post(`/${route}`, (req, res) => { const db = loadDB(); const item = { id: id(), ...req.body }; db[key].push(item); saveDB(db); res.status(201).json(item); });
  app.get(`/${route}`, (req, res) => { res.json(loadDB()[key]); });
  app.put(`/${route}/:id`, (req, res) => { const db = loadDB(); const i = db[key].findIndex((x: any) => x.id === req.params.id); if (i === -1) return res.status(404).json({ error: 'Não encontrado' }); db[key][i] = { ...db[key][i], ...req.body }; saveDB(db); res.json(db[key][i]); });
  app.delete(`/${route}/:id`, (req, res) => { const db = loadDB(); db[key] = db[key].filter((x: any) => x.id !== req.params.id) as any; saveDB(db); res.status(204).send(); });
}

crudRoutes('characters', 'characters');
crudRoutes('monsters', 'monsters');
crudRoutes('builds', 'builds');
crudRoutes('reviews', 'reviews');
crudRoutes('campaigns', 'campaigns');

app.get('/api-external/races', async (_, res) => res.json(await dndService.getRaces()));
app.get('/api-external/classes', async (_, res) => res.json(await dndService.getClasses()));
app.get('/api-external/monsters', async (_, res) => res.json(await dndService.getExternalMonsters()));
app.get('/api-external/spells', async (_, res) => res.json(await dndService.getSpells()));
app.get('/api-external/equipment', async (_, res) => res.json(await dndService.getEquipment()));
app.get('/', (_, res) => {
  res.json({
    message: 'API D&D funcionando',
    endpoints: [
      '/characters',
      '/monsters',
      '/builds',
      '/reviews',
      '/campaigns',
      '/api-external/races',
      '/api-external/classes',
      '/api-external/monsters',
      '/api-external/spells',
      '/api-external/equipment'
    ]
  });
});

if (!process.env.JEST_WORKER_ID) app.listen(3333, () => console.log('Servidor 3333'));
export { app };
