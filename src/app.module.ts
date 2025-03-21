import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig, { sqliteTestDataSourceConfig } from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        typeOrmConfig,
        sqliteTestDataSourceConfig,
        () => ({
          environment: process.env.NODE_ENV || 'test',
        }),
      ],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const environment = configService.get<string>('environment');
        console.log('el enviroment es:', environment);
        const config =
          environment === 'test'
            ? configService.get<DataSourceOptions>('sqlite')
            : configService.get<DataSourceOptions>('typeorm');
        if (!config) {
          throw new Error('No se encontró la configuración de TypeORM.');
        }

        return config;
      },
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    OrdersModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
