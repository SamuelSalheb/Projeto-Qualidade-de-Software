import axios from 'axios';

// Configura o Axios para apontar direto para a API oficial do D&D 5e
const dndApi = axios.create({
  baseURL: 'https://www.dnd5eapi.co/api',
});

export const dndService = {
  // Busca a lista oficial de raças (Humano, Elfo, Anão, etc.)
  async getRaces() {
    const response = await dndApi.get('/races');
    return response.data;
  },

  // Busca a lista oficial de classes (Guerreiro, Mago, Ladino, etc.)
  async getClasses() {
    const response = await dndApi.get('/classes');
    return response.data;
  },

  // Busca a lista oficial de monstros da API
  async getExternalMonsters() {
    const response = await dndApi.get('/monsters');
    return response.data;
  }
};