import { z } from 'zod';

// 1. Define the Schema
export const EnvSchema = z.object({
  MONGO_URL: z.string(),
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

// 2. Export the Type
export type Env = z.infer<typeof EnvSchema>;

// 3. The Factory Function
export default () => {
  const result = EnvSchema.safeParse(process.env);

  if (!result.success) {
    // Provides a readable error of exactly what is missing
    throw new Error(`Config validation error: ${result.error.message}`);
  }

  return result.data;
};

