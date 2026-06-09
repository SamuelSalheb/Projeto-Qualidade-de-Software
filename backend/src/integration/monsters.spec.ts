import { describe, it, expect, beforeEach } from '@jest/globals';
import request from 'supertest';
import { app } from '../server';
import fs from 'fs';
import path from 'path';

const DB_FILE = path.resolve(__dirname, '../../data.json');

function resetDB() {
  fs.writeFileSync(DB_FILE, JSON.stringify(
    { characters: [], monsters: [], builds: [], reviews: [], campaigns: [] },
    null, 2
  ));
}

describe('Monsters Integration Tests', () => {
  beforeEach(() => resetDB());

  it('deve criar um monstro (POST /monsters)', async () => {
    const res = await request(app).post('/monsters').send({ name: 'Goblin', type: 'Humanoide', cr: 0.25, hp: 7 });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Goblin');
  });

  it('deve listar monstros (GET /monsters)', async () => {
    await request(app).post('/monsters').send({ name: 'Orc', type: 'Humanoide', cr: 0.5, hp: 15 });
    const res = await request(app).get('/monsters');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('deve atualizar um monstro (PUT /monsters/:id)', async () => {
    const created = await request(app).post('/monsters').send({ name: 'Troll', type: 'Gigante', cr: 5, hp: 84 });
    const res = await request(app).put(`/monsters/${created.body.id}`).send({ hp: 100 });
    expect(res.status).toBe(200);
    expect(res.body.hp).toBe(100);
  });

  it('deve deletar um monstro (DELETE /monsters/:id)', async () => {
    const created = await request(app).post('/monsters').send({ name: 'Kobold', type: 'Humanoide', cr: 0.125, hp: 5 });
    const res = await request(app).delete(`/monsters/${created.body.id}`);
    expect(res.status).toBe(204);
  });
});

describe('D&D API Externa', () => {
  it('deve listar raças da API externa (GET /api-external/races)', async () => {
    const res = await request(app).get('/api-external/races');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('results');
  });

  it('deve listar classes da API externa (GET /api-external/classes)', async () => {
    const res = await request(app).get('/api-external/classes');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('results');
  });

  it('deve listar monstros da API externa (GET /api-external/monsters)', async () => {
    const res = await request(app).get('/api-external/monsters');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('results');
  });
});