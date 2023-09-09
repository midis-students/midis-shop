import * as process from 'process';

export type EnvConfig = {
  NODE_ENV: 'production' | 'development';
  port: number;
  postgres: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  secretKey: string;
};

process.env.NODE_ENV ??= 'development';

function getOrThrow<T = string>(key: string, defaultValue?: T) {
  const value = process.env[key] ?? defaultValue;

  if (value === undefined) {
    throw new Error(`Env variable '${key}' is not provided`);
  }
  return value as T;
}

export default (): EnvConfig => ({
  NODE_ENV: process.env.NODE_ENV as EnvConfig['NODE_ENV'],
  port: Number(getOrThrow('PORT', '3000')),
  postgres: {
    host: getOrThrow('POSTGRES_HOST'),
    port: Number(getOrThrow('POSTGRES_PORT', '27017')),
    username: getOrThrow('POSTGRES_USERNAME'),
    password: getOrThrow('POSTGRES_PASSWORD'),
    database: getOrThrow('POSTGRES_DATABASE'),
  },
  secretKey: getOrThrow('SECRET_KEY'),
});
