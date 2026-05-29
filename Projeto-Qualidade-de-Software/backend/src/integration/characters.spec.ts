import { describe, it, expect, beforeEach, afterAll } from '@jest/globals';
import request from 'supertest';
import { app } from '../server';
import { prisma } from '../database/prisma';

describe('Characters Integration Tests (CRUD)', () => {
  let globalUserId: string;

  // Cria um usuário real antes dos testes para satisfazer a FK
  beforeEach(async () => {
    await prisma.character.deleteMany({});
    await prisma.user.deleteMany({}); // Se a tabela se chamar diferente, ajuste aqui

    const user = await prisma.user.create({
      data: {
        id: 'user-real-id-123',
        name: 'Mestre da Masmorra',
        email: 'mestre@teste.com',
        password: 'senha123'
      }
    });
    globalUserId = user.id;
  });

  afterAll(async () => {
    await prisma.character.deleteMany({});
    await prisma.user.deleteMany({});
  });

  it('deve criar um novo personagem com sucesso (POST /characters)', async () => {
    const newChar = {
      name: 'Aragorn',
      race: 'Human',
      class: 'Ranger',
      level: 5,
      hp: 45,
      strength: 16,
      dexterity: 14,
      userId: globalUserId
    };

    const response = await request(app)
      .post('/characters')
      .send(newChar);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Aragorn');
  });

  it('deve retornar erro 400 ao tentar criar personagem inválido', async () => {
    const response = await request(app)
      .post('/characters')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('deve listar todos os personagens (GET /characters)', async () => {
    await prisma.character.create({
      data: {
        name: 'Legolas',
        race: 'Elf',
        class: 'Archer',
        level: 6,
        hp: 40,
        strength: 12,
        dexterity: 18,
        userId: globalUserId
      }
    });

    const response = await request(app).get('/characters');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].name).toBe('Legolas');
  });

  it('deve atualizar um personagem existente (PUT /characters/:id)', async () => {
    const char = await prisma.character.create({
      data: {
        name: 'Gimli',
        race: 'Dwarf',
        class: 'Warrior',
        level: 5,
        hp: 55,
        strength: 18,
        dexterity: 10,
        userId: globalUserId
      }
    });

    const response = await request(app)
      .put(`/characters/${char.id}`)
      .send({ level: 6, hp: 62 });

    expect(response.status).toBe(200);
    expect(response.body.level).toBe(6);
    expect(response.body.hp).toBe(62);
  });

  it('deve deletar um personagem existente (DELETE /characters/:id)', async () => {
    const char = await prisma.character.create({
      data: {
        name: 'Boromir',
        race: 'Human',
        class: 'Warrior',
        level: 4,
        hp: 38,
        strength: 15,
        dexterity: 12,
        userId: globalUserId
      }
    });

    const response = await request(app).delete(`/characters/${char.id}`);
    expect(response.status).toBe(204);

    const findChar = await prisma.character.findUnique({ where: { id: char.id } });
    expect(findChar).toBeNull();
  });
});