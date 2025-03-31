import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '../auth/auth.guard';
import { Products } from './product.entity';
import { Roles } from 'src/decorator/roles/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  getProducts(@Query('page') page?: string, @Query('limit') limit?: string) {
    // GET /products?page=2&limit=10
    const definedPage = page ? +page : 1;
    const definedLimit = limit ? +limit : 5;
    return this.productsService.getProducts(definedPage, definedLimit);
  }
  @Post('seeder')
  addProducts() {
    return this.productsService.addProduct();
  }
  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getProductById(@Param('id') id: string) {
    const uuidv4Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidv4Regex.test(id)) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'id no compatible' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const productFound = await this.productsService.getProductById(id);
    if (!productFound) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Producto no encontrado' },
        HttpStatus.NOT_FOUND,
      );
    }
    return productFound;
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async putUsers(@Param('id') id: string, @Body() product: Partial<Products>) {
    const uuidv4Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidv4Regex.test(id)) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'ID no compatible' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.productsService.modifiedProduct(id, product);
    if (!result) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Producto con ID ${id} no encontrado`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async deleteUsers(@Param('id') id: string) {
    const uuidv4Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidv4Regex.test(id)) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'ID no compatible' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.productsService.deleteProduct(id);
    if (!result) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Producto con ID ${id} no encontrado`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }
  // @Post(':id/upload')
  // @UseInterceptors(FileInterceptor('file'))
  // @UsePipes(ImageUploadPipePipe)
  // uploadImage(
  //   @Param('id') id: string,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   return this.productsService.uploadFile(file, id);
  // }
}
