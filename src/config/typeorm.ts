import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';

// Cargar variables de entorno
dotenvConfig({ path: path.resolve(__dirname, '../../.env.development') });

// Establecer NODE_ENV por defecto si no está definido
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '******' : 'NO DEFINIDA');

// Configuración de PostgreSQL
const dbConfig = {
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  autoLoadEntities: true,
  synchronize: true,
  logging: false,
  entities: ['dist/**/*.entity.{ts,js}'],
  migrations: ['dist/migrations/*.{js,ts}'],
  ssl: true,
};

// Configuración de SQLite para pruebas
const sqliteTestDataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: ':memory:',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  dropSchema: true,
};

// Registrar configuraciones
export default registerAs('typeorm', () => {
  const environment = process.env.NODE_ENV || 'test';

  if (environment === 'test') {
    return sqliteTestDataSourceOptions;
  }

  return dbConfig;
});

export const connectionSource = new DataSource(dbConfig as DataSourceOptions); //migraciones
export const sqliteTestDataSourceConfig = registerAs(
  'sqlite',
  () => sqliteTestDataSourceOptions,
);
export const sqliteTestDataSource = new DataSource(sqliteTestDataSourceOptions);
