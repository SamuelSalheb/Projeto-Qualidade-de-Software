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

describe('Characters Integration Tests (CRUD)', () => {
  beforeEach(() => resetDB());

  it('deve criar um personagem (POST /characters)', async () => {
    const res = await request(app).post('/characters').send({ name: 'Aragorn', race: 'Human', class: 'Ranger', level: 5 });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Aragorn');
    expect(res.body).toHaveProperty('id');
  });

  it('deve listar personagens (GET /characters)', async () => {
    await request(app).post('/characters').send({ name: 'Legolas', race: 'Elf', class: 'Archer', level: 6 });
    const res = await request(app).get('/characters');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('deve atualizar um personagem (PUT /characters/:id)', async () => {
    const created = await request(app).post('/characters').send({ name: 'Gimli', race: 'Dwarf', class: 'Warrior', level: 4 });
    const res = await request(app).put(`/characters/${created.body.id}`).send({ level: 7 });
    expect(res.status).toBe(200);
    expect(res.body.level).toBe(7);
  });

  it('deve deletar um personagem (DELETE /characters/:id)', async () => {
    const created = await request(app).post('/characters').send({ name: 'Boromir', race: 'Human', class: 'Warrior', level: 3 });
    const res = await request(app).delete(`/characters/${created.body.id}`);
    expect(res.status).toBe(204);
  });

  it('deve retornar 404 ao atualizar personagem inexistente', async () => {
    const res = await request(app).put('/characters/id-invalido').send({ level: 99 });
    expect(res.status).toBe(404);
  });
});