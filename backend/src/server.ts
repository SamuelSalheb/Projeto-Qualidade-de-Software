import express from 'express';
import { prisma } from './database/prisma';
import { dndService } from './services/dndService';

const app = express();
app.use(express.json());

// ==========================================
// 🧙‍♂️ ROTAS DE PERSONAGENS (CHARACTERS)
// ==========================================

// 1. Criar Personagem (POST)
app.post('/characters', async (req, res) => {
  try {
    const { name, race, class: charClass, level, hp, strength, dexterity, userId } = req.body;
    
    const character = await prisma.character.create({
      data: { name, race, class: charClass, level, hp, strength, dexterity, userId }
    });
    
    res.status(201).json(character);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar personagem" });
  }
});

// 2. Listar todos os Personagens (GET)
app.get('/characters', async (req, res) => {
  const characters = await prisma.character.findMany();
  res.json(characters);
});

// 3. Atualizar Personagem (PUT)
app.put('/characters/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    
    const updated = await prisma.character.update({
      where: { id },
      data
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar personagem" });
  }
});

// 4. Deletar Personagem (DELETE)
app.delete('/characters/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.character.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Erro ao deletar personagem" });
  }
});


// ==========================================
// 👹 ROTAS DE MONSTROS (MONSTERS TEMPLATES)
// ==========================================

// 1. Criar Modelo de Monstro (POST)
app.post('/monsters', async (req, res) => {
  try {
    const { name, type, challengeRating, hp, armorClass } = req.body;
    
    const monster = await prisma.monsterTemplate.create({
      data: { name, type, challengeRating, hp, armorClass }
    });
    
    res.status(201).json(monster);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar monstro" });
  }
});

// 2. Listar todos os Monstros (GET)
app.get('/monsters', async (req, res) => {
  const monsters = await prisma.monsterTemplate.findMany();
  res.json(monsters);
});

// 3. Atualizar Monstro (PUT)
app.put('/monsters/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    
    const updated = await prisma.monsterTemplate.update({
      where: { id },
      data
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar monstro" });
  }
});

// 4. Deletar Monstro (DELETE)
app.delete('/monsters/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.monsterTemplate.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Erro ao deletar monstro" });
  }
});

// Inicializar o Servidor na porta 3333
// Só inicia o servidor na porta 3333 se NÃO estiver rodando pelo Jest
if (!process.env.JEST_WORKER_ID) {
  app.listen(3333, () => {
    console.log('🚀 Servidor do Back-End rodando na porta 3333!');
  });
}

// ==========================================
// 🐉 ROTAS DE INTEGRAÇÃO - API OFICIAL D&D 5E
// ==========================================

// Rota para o Front-End listar as raças oficiais
app.get('/api-external/races', async (req, res) => {
  try {
    const races = await dndService.getRaces();
    res.json(races);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar raças da API oficial de D&D" });
  }
});

// Rota para o Front-End listar as classes oficiais
app.get('/api-external/classes', async (req, res) => {
  try {
    const classes = await dndService.getClasses();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar classes da API oficial de D&D" });
  }
});

// Rota para o Front-End listar monstros oficiais da API externa
app.get('/api-external/monsters', async (req, res) => {
  try {
    const monsters = await dndService.getExternalMonsters();
    res.json(monsters);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar monstros da API oficial de D&D" });
  }
});

export { app };