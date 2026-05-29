import { defineConfig } from '@prisma/config';
import 'dotenv/config';

export default defineConfig({
  datasource: {
    // Esse truque faz o TypeScript aceitar o 'process' sem reclamar
    url: (globalThis as any).process.env.DATABASE_URL,
  },
});
