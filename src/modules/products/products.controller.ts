import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '../auth/auth.guard';
import { Product } from './product.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @UseGuards(AuthGuard)
  getProducts(@Query('page') page?: string, @Query('limit') limit?: string) {
    const definedPage = page ? +page : 1;
    const definedLimit = limit ? +limit : 5;
    return this.productsService.getProducts(definedPage, definedLimit);
  }
  @Get(':id')
  @UseGuards(AuthGuard)
  getProductById(@Param('id') id: string) {
    const productFound = this.productsService.getProductById(Number(id));
    return productFound;
  }
  @Post()
  postProducts(@Body() product: Product) {
    const productCreated: Product = this.productsService.createProduct(product);
    return 'el id del producto es, id:' + productCreated.id;
  }
  @Put(':id')
  @UseGuards(AuthGuard)
  putUsers(@Param('id') id: string, @Body() product: Partial<Product>) {
    return this.productsService.modifiedProduct(+id, product);
  }
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUsers(@Param('id') id: string) {
    return this.productsService.deleteProduct(+id);
  }
}
/*  
  
 
  
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUsers(@Param('id') id: string) {
    return this.usersService.deleteUser(+id);
  } */
