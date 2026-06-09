import { describe, it, expect } from '@jest/globals';
import { isValidEmail, somarAtributos, isValidPassword, calcularModificador } from './validators';

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

  describe('isValidPassword', () => {
    it('deve retornar TRUE para senha com 6 ou mais caracteres', () => {
      expect(isValidPassword('abc123')).toBe(true);
    });
    it('deve retornar FALSE para senha com menos de 6 caracteres', () => {
      expect(isValidPassword('abc')).toBe(false);
    });
  });

  describe('calcularModificador', () => {
    it('deve retornar +2 para atributo 15', () => {
      expect(calcularModificador(15)).toBe(2);
    });
    it('deve retornar 0 para atributo 10', () => {
      expect(calcularModificador(10)).toBe(0);
    });
    it('deve retornar -1 para atributo 8', () => {
      expect(calcularModificador(8)).toBe(-1);
    });
  });

});