import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { dndService } from './services/dndService';

const app = express();

app.use(cors());
app.use(express.json());

const DB_FILE = path.resolve(__dirname, '../data.json');

type DB = {
  users: any[];
  characters: any[];
  monsters: any[];
  builds: any[];
  reviews: any[];
  campaigns: any[];
};

function loadDB(): DB {
  if (!fs.existsSync(DB_FILE)) {
    const initial: DB = {
      users: [],
      characters: [],
      monsters: [],
      builds: [],
      reviews: [],
      campaigns: []
    };

    fs.writeFileSync(
      DB_FILE,
      JSON.stringify(initial, null, 2)
    );

    return initial;
  }

  return JSON.parse(
    fs.readFileSync(DB_FILE, 'utf8')
  );
}

function saveDB(db: DB) {
  fs.writeFileSync(
    DB_FILE,
    JSON.stringify(db, null, 2)
  );
}

const id = () => Date.now().toString();

function crudRoutes(
  route: string,
  key: keyof DB
) {
  app.post(`/${route}`, (req, res) => {
    const db = loadDB();

    const item = {
      id: id(),
      ...req.body
    };

    db[key].push(item);

    saveDB(db);

    res.status(201).json(item);
  });

  app.get(`/${route}`, (_, res) => {
    res.json(loadDB()[key]);
  });

  app.put(`/${route}/:id`, (req, res) => {
    const db = loadDB();

    const index = db[key].findIndex(
      (x: any) => x.id === req.params.id
    );

    if (index === -1) {
      return res
        .status(404)
        .json({ error: 'Não encontrado' });
    }

    db[key][index] = {
      ...db[key][index],
      ...req.body
    };

    saveDB(db);

    res.json(db[key][index]);
  });

  app.delete(`/${route}/:id`, (req, res) => {
    const db = loadDB();

    db[key] = db[key].filter(
      (x: any) => x.id !== req.params.id
    ) as any;

    saveDB(db);

    res.status(204).send();
  });
}

/* CRUDS */

crudRoutes('characters', 'characters');
crudRoutes('monsters', 'monsters');
crudRoutes('builds', 'builds');
crudRoutes('reviews', 'reviews');
crudRoutes('campaigns', 'campaigns');

/* UC01 - Cadastro */

app.post('/register', (req, res) => {
  const db = loadDB();

  const { email, password } = req.body;

  const exists = db.users.find(
    (u: any) => u.email === email
  );

  if (exists) {
    return res.status(400).json({
      error: 'Usuário já cadastrado'
    });
  }

  const user = {
    id: id(),
    email,
    password
  };

  db.users.push(user);

  saveDB(db);

  res.status(201).json(user);
});

/* UC02 - Login */

app.post('/login', (req, res) => {
  const db = loadDB();

  const { email, password } = req.body;

  const user = db.users.find(
    (u: any) =>
      u.email === email &&
      u.password === password
  );

  if (!user) {
    return res.status(401).json({
      error: 'Credenciais inválidas'
    });
  }

  res.json({
    token: 'epicforge-token',
    user
  });
});

/* API EXTERNA */

app.get('/api-external/races', async (_, res) => {
  res.json(await dndService.getRaces());
});

app.get('/api-external/classes', async (_, res) => {
  res.json(await dndService.getClasses());
});

app.get('/api-external/monsters', async (_, res) => {
  res.json(await dndService.getExternalMonsters());
});

app.get('/api-external/spells', async (_, res) => {
  res.json(await dndService.getSpells());
});

app.get('/api-external/equipment', async (_, res) => {
  res.json(await dndService.getEquipment());
});

/* UC03 - Consulta de Itens */

app.get('/api-external/items', async (_, res) => {
  res.json(await dndService.getEquipment());
});

/* UC04 - Filtro de Itens */

app.get(
  '/api-external/items/filter',
  async (req, res) => {
    const equipment =
      await dndService.getEquipment();

    const search = String(
      req.query.search || ''
    ).toLowerCase();

    const filtered =
      equipment.results?.filter(
        (item: any) =>
          item.name
            .toLowerCase()
            .includes(search)
      ) || [];

    res.json(filtered);
  }
);

/* UC05 - Detalhes de Classe */

app.get(
  '/api-external/classes/:className',
  async (req, res) => {
    const classes =
      await dndService.getClasses();

    const item =
      classes.results?.find(
        (c: any) =>
          c.index === req.params.className
      );

    res.json(item || null);
  }
);

/* UC15 - Sincronização */

app.post('/sync', async (_, res) => {
  const races =
    await dndService.getRaces();

  const classes =
    await dndService.getClasses();

  const spells =
    await dndService.getSpells();

  res.json({
    success: true,
    races: races.count,
    classes: classes.count,
    spells: spells.count
  });
});

/* HOME */

app.get('/', (_, res) => {
  res.json({
    message: 'API D&D funcionando',
    endpoints: [
      '/register',
      '/login',

      '/characters',
      '/monsters',
      '/builds',
      '/reviews',
      '/campaigns',

      '/api-external/races',
      '/api-external/classes',
      '/api-external/monsters',
      '/api-external/spells',
      '/api-external/equipment',

      '/api-external/items',
      '/api-external/items/filter',

      '/sync'
    ]
  });
});

if (!process.env.JEST_WORKER_ID) {
  app.listen(3333, () => {
    console.log('Servidor 3333');
  });
}

export { app };