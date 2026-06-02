import { describe, it, expect } from '@jest/globals';

describe('Configuração do Ambiente de Testes', () => {
  it('deve confirmar que o Jest está configurado corretamente', () => {
    const soma = 2 + 2;
    expect(soma).toBe(4);
  });
});