/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { DataSourceOptions } from 'typeorm';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get('typeorm'); // Usa directamente lo registrado
        if (!config) throw new Error('Configuración no encontrada');
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
