export interface EnvironmentVariables {
  DB_HOST: string;
  DB_PORT: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;

  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
}
