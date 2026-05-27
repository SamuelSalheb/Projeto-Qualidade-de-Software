import { describe, it, expect, afterAll } from '@jest/globals';
import request from 'supertest';
import { app } from '../server';
import { prisma } from '../database/prisma';

describe('🌍 Testes de Integração - Monstros', () => {
  // Alterado para string porque no seu schema o ID é um UUID
  let monstroIdCriado: string; 

  // Teste 1: Dispara o POST e verifica o Banco
  it('deve criar um monstro novo através da rota POST e salvar no banco', async () => {
    // Agora com os atributos exatos do seu schema.prisma
    const novoMonstro = {
      name: 'Goblin de Teste (Integração)',
      type: 'Humanoide',
      challengeRating: 0.25,
      hp: 7,
      armorClass: 15
    };

    // 1. Simula a requisição chamando a rota exata do seu server.ts
    const response = await request(app)
      .post('/monsters') 
      .send(novoMonstro);

    // 2. Confirma se a API respondeu com sucesso
    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.status).toBeLessThan(300);

    monstroIdCriado = response.body.id; 

    // 3. A PROVA REAL: Vai direto no banco usando o nome correto do model
    const monstroNoBanco = await prisma.monsterTemplate.findUnique({ 
      where: { id: monstroIdCriado }
    });

    // 4. Exige que o monstro exista no banco e tenha o nome correto
    expect(monstroNoBanco).not.toBeNull();
    expect(monstroNoBanco?.name).toBe('Goblin de Teste (Integração)');
  });

  // Teste 2: Dispara o GET para listar
  it('deve retornar uma lista de monstros na rota GET', async () => {
    const response = await request(app).get('/monsters'); 
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Limpeza: Apaga o monstro de teste do banco para manter tudo limpo
  afterAll(async () => {
    if (monstroIdCriado) {
      await prisma.monsterTemplate.delete({ 
        where: { id: monstroIdCriado }
      });
    }
    // Desconecta o banco após os testes para o Jest encerrar corretamente
    await prisma.$disconnect();
  });
});