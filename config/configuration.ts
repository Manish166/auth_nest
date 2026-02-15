import { IsEnum, IsString, validate } from 'class-validator';

enum NodeEnvironment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export class EnvironmentVariables {
  @IsString()
  MONGO_URL?: string;

  @IsString()
  PORT?: string;

  @IsEnum(NodeEnvironment)
  @IsString()
  NODE_ENV?: string;

  @IsString()
  JWT_SECRET?: string
};

export default async () => {
  const env = new EnvironmentVariables();
  env.MONGO_URL = process.env.MONGO_URL;
  env.PORT = process.env.PORT || '4001';
  env.NODE_ENV = process.env.NODE_ENV as NodeEnvironment || NodeEnvironment.Development;
  env.JWT_SECRET = process.env.JWT_SECRET

  const errors = await validate(env, { skipMissingProperties: false });
  if (errors.length > 0) {
    throw new Error(`Config validation error: ${JSON.stringify(errors)}`);
  }


  return env;
};