import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from './entity/order.detail.entity';
import { Repository } from 'typeorm';
import { OrderDetailDto } from './dto/orderDetail.dto';

@Injectable()
export class OrderDetailService {
  async findOneByOrderId(orderId: string, relations: string[] = []) {
    return await this.orderDetailRepository.find({
      where: { order: { id: orderId } },
      relations: relations,
    });
  }
  constructor(
    @InjectRepository(OrderDetails)
    private readonly orderDetailRepository: Repository<OrderDetails>,
  ) {}
  async create(orderDetailDto: OrderDetailDto): Promise<OrderDetails> {
    const orderDetail = this.orderDetailRepository.create(orderDetailDto);
    return await this.orderDetailRepository.save(orderDetail);
  }
}
