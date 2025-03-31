import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponseDto } from './dto/response-order.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
// import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const orderDetailEntity = await this.ordersService.create(createOrderDto);
    return new OrderResponseDto(orderDetailEntity);
  }

  // @Get()
  // findAll() {
  //   return this.ordersService.findAll();
  // }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string) {
    const uuidv4Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidv4Regex.test(id)) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'id no compatible' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const orderFound = await this.ordersService.findOne(id);
    if (!orderFound) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Orden no encontrada' },
        HttpStatus.NOT_FOUND,
      );
    }
    return orderFound;
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.ordersService.update(+id, updateOrderDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ordersService.remove(+id);
  // }
}
