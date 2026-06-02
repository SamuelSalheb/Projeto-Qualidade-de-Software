import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import axios from 'axios';
import { dndService } from './dndService';

// Mocka o axios de forma leve
jest.mock('axios', () => {
  return {
    create: jest.fn().mockReturnThis(),
    get: jest.fn()
  };
});

describe('DndService Tests', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve buscar a lista de raças com sucesso', async () => {
    const mockData = { results: [{ index: 'human', name: 'Human' }] };
    
    // Intercepta a chamada do .get da instância criada
    const spy = jest.spyOn(axios, 'get' as any).mockResolvedValue({ data: mockData });

    const result = await dndService.getRaces();
    expect(result).toEqual(mockData);
    spy.mockRestore();
  });

  it('deve buscar a lista de classes com sucesso', async () => {
    const mockData = { results: [{ index: 'wizard', name: 'Wizard' }] };
    
    const spy = jest.spyOn(axios, 'get' as any).mockResolvedValue({ data: mockData });

    const result = await dndService.getClasses();
    expect(result).toEqual(mockData);
    spy.mockRestore();
  });

  it('deve buscar a lista de monstros externos com sucesso', async () => {
    const mockData = { results: [{ index: 'beholder', name: 'Beholder' }] };
    
    const spy = jest.spyOn(axios, 'get' as any).mockResolvedValue({ data: mockData });

    const result = await dndService.getExternalMonsters();
    expect(result).toEqual(mockData);
    spy.mockRestore();
  });
});