import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'dotenv/config';

// 1. Cria uma piscina de conexões nativa do PostgreSQL usando sua URL do Neon
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// 2. Transforma essa conexão no formato que o Prisma 7 exige
const adapter = new PrismaPg(pool);

// 3. Inicializa o Prisma passando o adaptador pronto
export const prisma = new PrismaClient({ adapter });