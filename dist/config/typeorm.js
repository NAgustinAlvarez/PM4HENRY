"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqliteTestDataSource = exports.sqliteTestDataSourceConfig = exports.connectionSource = void 0;
const config_1 = require("@nestjs/config");
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
const path = require("path");
(0, dotenv_1.config)({ path: path.resolve(__dirname, '../../.env.development') });
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '******' : 'NO DEFINIDA');
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
const sqliteTestDataSourceOptions = {
    type: 'sqlite',
    database: ':memory:',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    dropSchema: true,
};
exports.default = (0, config_1.registerAs)('typeorm', () => {
    const environment = process.env.NODE_ENV || 'test';
    if (environment === 'test') {
        return sqliteTestDataSourceOptions;
    }
    return dbConfig;
});
exports.connectionSource = new typeorm_1.DataSource(dbConfig);
exports.sqliteTestDataSourceConfig = (0, config_1.registerAs)('sqlite', () => sqliteTestDataSourceOptions);
exports.sqliteTestDataSource = new typeorm_1.DataSource(sqliteTestDataSourceOptions);
//# sourceMappingURL=typeorm.js.map