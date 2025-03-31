import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './product.entity';
import { Repository } from 'typeorm';
import { Categories } from 'src/modules/categories/entities/category.entity';
import * as data from '../../data.json';
import { CategoriesService } from '../categories/categories.service';

interface Product {
  name: string;
  description: string;
  price: number;
  stock: number;
  imgUrl: string;
  category: string;
}

@Injectable()
export class ProductsService implements OnModuleInit {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async onModuleInit() {
    const categoriesCount = await this.categoriesRepository.count();
    if (categoriesCount === 0) {
      await this.categoriesService.addCategories();
    }
    await this.seedProducts();
  }
  private async seedProducts() {
    try {
      const productsCount = await this.productsRepository.count();

      if (productsCount === 0) {
        this.logger.log('Iniciando carga inicial de productos...');
        await this.addProduct();
        this.logger.log('Productos cargados exitosamente');
      } else {
        this.logger.log(
          'Ya existen productos en la base de datos, omitiendo carga inicial',
        );
      }
    } catch (error) {
      this.logger.error('Error al cargar productos iniciales:', error);
      throw error;
    }
  }

  async buyProduct(id: string) {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product || product.stock == 0) {
      throw new Error('Producto agotado');
    }
    await this.productsRepository.update(id, { stock: product.stock - 1 });
    return product?.price;
  }

  async modifiedProduct(id: string, product: Partial<Products>) {
    const existingProduct = await this.productsRepository.findOne({
      where: { id },
    });
    if (!existingProduct) {
      return null;
    }
    const updatedProduct = { ...existingProduct, ...product };
    await this.productsRepository.save(updatedProduct);
    return updatedProduct;
  }

  async getProducts(page: number, limit: number) {
    let products = await this.productsRepository.find({
      relations: { category: true },
    });
    const definedPage = page;
    const definedLimit = limit;
    const startIndex = (definedPage - 1) * definedLimit;
    const endIndex = startIndex + definedLimit;
    products = products.slice(startIndex, endIndex);
    return products;
  }

  async addProduct() {
    const typedData: Product[] = data as Product[];
    if (!Array.isArray(typedData)) {
      throw new Error('Los datos no son un array válido');
    }
    const categories = await this.categoriesRepository.find();

    await Promise.all(
      typedData.map(async (element) => {
        const category = categories.find(
          (category) => category.name === element.category,
        );
        if (!category) {
          throw new Error(`Categoría "${element.category}" no encontrada`);
        }
        const product = new Products();
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        product.imgUrl = element.imgUrl;
        product.stock = element.stock;
        product.category = category;

        await this.productsRepository
          .createQueryBuilder()
          .insert()
          .into(Products)
          .values(product)
          .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
          .execute();
      }),
    );

    return 'Productos agregados';
  }

  async getProductById(id: string) {
    return this.productsRepository.findOne({ where: { id } });
  }

  async deleteProduct(id: string) {
    const product = await this.productsRepository.findOne({
      where: { id },
    });
    if (!product) {
      return null;
    }
    await this.productsRepository.delete(id);
    return { message: `Producto con ID ${id} ha sido eliminado` };
  }
}
