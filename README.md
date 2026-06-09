# EpicForge — Compêndio de RPG D&D 5e

Plataforma web fullstack para gerenciamento de campanhas D&D 5e.

## Stack
- **Frontend:** React + TypeScript + Vite
- **Backend:** Node.js + Express + TypeScript
- **Banco:** JSON file (data.json)
- **API Externa:** [D&D 5e API](https://www.dnd5eapi.co/)
- **Testes:** Jest + Supertest

## Pré-requisitos
- Node.js 18+
- npm

## Como rodar

### Backend
```bash
cd backend
npm install
npm run dev
```
Servidor sobe em: http://localhost:3333

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend sobe em: http://localhost:5173

## Rodar os testes
```bash
cd backend
npm test
```

## Endpoints disponíveis
| Método | Rota | Descrição |
|--------|------|-----------|
| GET/POST | /characters | CRUD de personagens |
| GET/POST | /monsters | CRUD de monstros |
| GET/POST | /builds | CRUD de builds |
| GET/POST | /reviews | CRUD de reviews |
| GET/POST | /campaigns | CRUD de campanhas |
| GET | /api-external/races | Raças oficiais D&D |
| GET | /api-external/classes | Classes oficiais D&D |
| GET | /api-external/spells | Magias oficiais D&D |
| GET | /api-external/monsters | Monstros oficiais D&D |
| GET | /api-external/equipment | Equipamentos D&D |