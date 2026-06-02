import express from 'express';
import { dndService } from './services/dndService';

const app = express();

app.use(express.json());

// ==========================================
// BANCO SIMPLES EM MEMÓRIA
// ==========================================

let characters: any[] = [];
let monsters: any[] = [];

// ==========================================
// 🧙‍♂️ ROTAS DE PERSONAGENS
// ==========================================

// Criar personagem
app.post('/characters', async (req, res) => {
  try {
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