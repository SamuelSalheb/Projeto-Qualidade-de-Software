import axios from 'axios';

const dndApi = axios.create({
  baseURL: 'https://www.dnd5eapi.co/api',
});

export const dndService = {
  async getRaces() {
    const response = await dndApi.get('/races');
    return response.data;
  },
  async getClasses() {
    const response = await dndApi.get('/classes');
    return response.data;
  },
  async getExternalMonsters() {
    const response = await dndApi.get('/monsters');
    return response.data;
  },
  async getSpells() {
    const response = await dndApi.get('/spells');
    return response.data;
  },
  async getEquipment() {
    const response = await dndApi.get('/equipment');
    return response.data;
  },
};