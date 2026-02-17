import { config } from 'dotenv';
config(); // Load your .env variables

export default {
  uri: process.env.MONGO_URL, // e.g., mongodb://localhost:27017/my-db
  migrationsPath: './migrations',
  templatePath: './migrations/template.ts',
  autosync: false, // Don't automatically run on start
  timeout: 10000, // Force exit after 10 seconds if it hangs
};