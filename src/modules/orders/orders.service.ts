import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Repository } from 'typeorm';
import { Orders } from './entity/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/modules/users/user.entity';
import { OrderDetailService } from '../orderDetail/orderDetail.service';
import { Products } from '../products/product.entity';
import { OrderDetails } from '../orderDetail/entity/order.detail.entity';
export interface ProductId {
  id: string;
}
@Injectable()
export class OrdersService {
  async findOne(id: string) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      return order;
    }
    const orderDetail = await this.orderDService.findOneByOrderId(order.id, [
      'products',
      'order',
    ]);
    return orderDetail;
  }
  constructor(
    @InjectRepository(Orders) private orderRepository: Repository<Orders>,
    @InjectRepository(OrderDetails)
    private orderDetailRepository: Repository<OrderDetails>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(Products) private productRepository: Repository<Products>,
    private orderDService: OrderDetailService,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const { userId, products } = createOrderDto;
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    const validProducts = await this.validatedProducts(products);
    const total = await this.calculateTotal(validProducts);
    // Crear la orden y los detalles dentro de una transacción
    const queryRunner =
      this.orderRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const order = this.orderRepository.create({ user, date: new Date() });
      const orderEntity = await queryRunner.manager.save(order);
      const orderDetail = this.orderDetailRepository.create({
        order: orderEntity,
        products: validProducts,
        price: total,
      });
      const orderDetailEntity = await queryRunner.manager.save(orderDetail);
      await this.updateProductsStock(validProducts);
      await queryRunner.commitTransaction();
      return orderDetailEntity;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'Error al crear la orden',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }
  private async updateProductsStock(products: Array<Products>) {
    for (const product of products) {
      const productEntity = await this.productRepository.findOne({
        where: { id: product.id },
      });
      if (!productEntity) {
        throw new HttpException(
          `Producto con ID ${product.id} no encontrado`,
          HttpStatus.NOT_FOUND,
        );
      }
      if (productEntity.stock <= 0) {
        throw new HttpException(
          `Producto con ID ${product.id} no tiene suficiente stock`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const updatedStock = productEntity.stock - 1;
      await this.productRepository.update(product.id, { stock: updatedStock });
      console.log(
        `Stock actualizado para producto ID ${product.id}: ${updatedStock}`,
      );
    }
  }
  private async calculateTotal(products: Array<ProductId>): Promise<number> {
    let total = 0;
    for (const product of products) {
      const productEntity = await this.productRepository.findOne({
        where: { id: product.id },
      });
      if (!productEntity) {
        throw new HttpException(
          `Producto con ID ${product.id} no encontrado`,
          HttpStatus.NOT_FOUND,
        );
      }
      // Convertir el precio a número
      const price = parseFloat(productEntity.price.toString());
      if (isNaN(price)) {
        throw new HttpException(
          `El precio del producto con ID ${product.id} no es válido`,
          HttpStatus.BAD_REQUEST,
        );
      }
      total += price;
    }
    return total;
  }
  private async validatedProducts(products: Partial<Products>[]) {
    const validProducts: Products[] = [];
    for (const product of products) {
      const productEntity = await this.productRepository.findOne({
        where: { id: product.id },
      });
      if (!productEntity) {
        throw new HttpException(
          `Producto con ID ${product.id} no encontrado`,
          HttpStatus.NOT_FOUND,
        );
      }
      if (productEntity.stock <= 0) {
        throw new HttpException(
          `Producto con ID ${product.id} no tiene suficiente stock`,
          HttpStatus.BAD_REQUEST,
        );
      }
      validProducts.push(productEntity);
    }
    return validProducts;
  }
}
