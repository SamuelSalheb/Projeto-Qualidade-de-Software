import express from 'express';
import cors from 'cors';
import { dndService } from './services/dndService';

const app = express();

app.use(cors());
app.use(express.json());

// ==========================================
// BANCO SIMPLES EM MEMÓRIA
// ==========================================

let characters: any[] = [];
let monsters: any[] = [];
let builds: any[] = [];
let reviews: any[] = [];

// ==========================================
// 🧙‍♂️ ROTAS DE PERSONAGENS
// ==========================================

// Criar personagem
app.post('/characters', async (req, res) => {
  try {
    const { name, race, class: cls } = req.body;

    if (!name || !race || !cls) {
      return res.status(400).json({
        error: 'Campos obrigatórios: name, race, class'
      });
    }

    const character = {
      id: Date.now().toString(),
      ...req.body
    };

    characters.push(character);

    res.status(201).json(character);
  } catch (error) {
    res.status(400).json({
      error: 'Erro ao criar personagem'
    });
  }
});

// Listar personagens
app.get('/characters', async (req, res) => {
  res.json(characters);
});

// Atualizar personagem
app.put('/characters/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const index = characters.findIndex(c => c.id === id);

    if (index === -1) {
      return res.status(404).json({
        error: 'Personagem não encontrado'
      });
    }

    characters[index] = {
      ...characters[index],
      ...req.body
    };

    res.json(characters[index]);
  } catch (error) {
    res.status(400).json({
      error: 'Erro ao atualizar personagem'
    });
  }
});

// Deletar personagem
app.delete('/characters/:id', async (req, res) => {
  try {
    const { id } = req.params;

    characters = characters.filter(c => c.id !== id);

    res.status(204).send();
  } catch (error) {
    res.status(400).json({
      error: 'Erro ao deletar personagem'
    });
  }
});

// ==========================================
// 👹 ROTAS DE MONSTROS
// ==========================================

// Criar monstro
app.post('/monsters', async (req, res) => {
  try {
    const { name, type } = req.body;

    if (!name || !type) {
      return res.status(400).json({
        error: 'Campos obrigatórios: name, type'
      });
    }

    const monster = {
      id: Date.now().toString(),
      ...req.body
    };

    monsters.push(monster);

    res.status(201).json(monster);
  } catch (error) {
    res.status(400).json({
      error: 'Erro ao criar monstro'
    });
  }
});

// Listar monstros
app.get('/monsters', async (req, res) => {
  res.json(monsters);
});

// Atualizar monstro
app.put('/monsters/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const index = monsters.findIndex(m => m.id === id);

    if (index === -1) {
      return res.status(404).json({
        error: 'Monstro não encontrado'
      });
    }

    monsters[index] = {
      ...monsters[index],
      ...req.body
    };

    res.json(monsters[index]);
  } catch (error) {
    res.status(400).json({
      error: 'Erro ao atualizar monstro'
    });
  }
});

// Deletar monstro
app.delete('/monsters/:id', async (req, res) => {
  try {
    const { id } = req.params;

    monsters = monsters.filter(m => m.id !== id);

    res.status(204).send();
  } catch (error) {
    res.status(400).json({
      error: 'Erro ao deletar monstro'
    });
  }
});

// ==========================================
// ⚔️ ROTAS DE BUILDS
// ==========================================

// Criar build
app.post('/builds', async (req, res) => {
  try {
    const { title, author } = req.body;

    if (!title || !author) {
      return res.status(400).json({
        error: 'Campos obrigatórios: title, author'
      });
    }

    const build = {
      id: Date.now().toString(),
      rating: 0,
      ...req.body
    };

    builds.push(build);

    res.status(201).json(build);
  } catch (error) {
    res.status(400).json({
      error: 'Erro ao criar build'
    });
  }
});

// Listar builds
app.get('/builds', async (req, res) => {
  res.json(builds);
});

// Deletar build
app.delete('/builds/:id', async (req, res) => {
  try {
    const { id } = req.params;

    builds = builds.filter(b => b.id !== id);

    res.status(204).send();
  } catch (error) {
    res.status(400).json({
      error: 'Erro ao deletar build'
    });
  }
});

// ==========================================
// ⭐ ROTAS DE REVIEWS
// ==========================================

// Criar review
app.post('/reviews', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        error: 'Campo obrigatório: text'
      });
    }

    const review = {
      id: Date.now().toString(),
      text,
      createdAt: new Date().toISOString()
    };

    reviews.push(review);

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({
      error: 'Erro ao criar review'
    });
  }
});

// Listar reviews
app.get('/reviews', async (req, res) => {
  res.json(reviews);
});

// Deletar review
app.delete('/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;

    reviews = reviews.filter(r => r.id !== id);

    res.status(204).send();
  } catch (error) {
    res.status(400).json({
      error: 'Erro ao deletar review'
    });
  }
});

// ==========================================
// 🐉 API EXTERNA D&D
// ==========================================

app.get('/api-external/races', async (req, res) => {
  try {
    const races = await dndService.getRaces();
    res.json(races);
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao buscar raças'
    });
  }
});

app.get('/api-external/classes', async (req, res) => {
  try {
    const classes = await dndService.getClasses();
    res.json(classes);
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao buscar classes'
    });
  }
});

app.get('/api-external/monsters', async (req, res) => {
  try {
    const monsters = await dndService.getExternalMonsters();
    res.json(monsters);
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao buscar monstros'
    });
  }
});

// ==========================================
// SERVIDOR
// ==========================================

if (!process.env.JEST_WORKER_ID) {
  app.listen(3333, () => {
    console.log('🚀 Servidor do Back-End rodando na porta 3333!');
  });
}

export { app };
