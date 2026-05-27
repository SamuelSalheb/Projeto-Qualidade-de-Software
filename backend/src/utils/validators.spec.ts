import { describe, it, expect } from '@jest/globals';
import { isValidEmail, somarAtributos } from './validators';

describe('🧪 Testes Unitários - Validações e Utilitários', () => {

  // --- GRUPO DE TESTES 1: Validação de E-mail ---
  describe('isValidEmail', () => {
    it('deve retornar TRUE para um e-mail estruturado corretamente', () => {
      const resultado = isValidEmail('arthur@email.com');
      expect(resultado).toBe(true);
    });

    it('deve retornar FALSE para um e-mail sem o símbolo @', () => {
      const resultado = isValidEmail('arthuremail.com');
      expect(resultado).toBe(false);
    });
  });

  // --- GRUPO DE TESTES 2: Soma de Atributos (D&D) ---
  describe('somarAtributos', () => {
    it('deve calcular corretamente a soma total dos atributos do personagem', () => {
      const fichaPersonagem = {
        forca: 15,        // +2
        destreza: 14,      // +2
        constituicao: 13,  // +1
        inteligencia: 12,  // +1
        sabedoria: 10,     // 0
        carisma: 8         // -1
      };

      // A soma matemática deve dar: 15 + 14 + 13 + 12 + 10 + 8 = 72
      const total = somarAtributos(fichaPersonagem);
      
      expect(total).toBe(72);
    });
  });

});