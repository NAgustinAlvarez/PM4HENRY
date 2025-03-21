import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './product.entity';
import { Repository } from 'typeorm';
import { Categories } from 'src/categories/entities/category.entity';
import * as data from '../../data.json';
// import { UploadFileDto } from '../files/dto/uploadFile.dto';

// Define la interfaz para los productos
interface Product {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imgUrl: string;
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}
  // async uploadFile(file: UploadFileDto, id: string) {
  //   const url = await this.fileUploadService.uploadFile({
  //     fieldname: file.fieldname,
  //     buffer: file.buffer,
  //     originalname: file.originalname,
  //     mimetype: file.mimetype,
  //     size: file.size,
  //   });
  //   await this.productsRepository.update(id, { imgUrl: url });
  //   return { imgUrl: url };
  // }
  async buyProduct(id: string) {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product || product.stock == 0) {
      throw new Error('Out of stock');
    }
    await this.productsRepository.update(id, { stock: product.stock - 1 });
    console.log('product bought succesfully');
    return product?.price;
  }
  async modifiedProduct(id: string, product: Partial<Products>) {
    // Busca el producto por su ID
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
    }); // Muestra las propiedades de category
    const definedPage = page;
    const definedLimit = limit;
    const startIndex = (definedPage - 1) * definedLimit;
    const endIndex = startIndex + definedLimit;
    products = products.slice(startIndex, endIndex);
    return products;
  }
  async addProduct() {
    // Asegúrate de que `data` sea tratado como un array de `Product`
    const typedData: Product[] = data as Product[];

    // Verifica que `data` sea un array antes de usar `.map`
    if (!Array.isArray(typedData)) {
      throw new Error('Data is not an array');
    }

    const categories = await this.categoriesRepository.find();

    // Usa Promise.all para manejar las inserciones en paralelo
    await Promise.all(
      typedData.map(async (element) => {
        const category = categories.find(
          (category) => category.name === element.category,
        );

        if (!category) {
          throw new Error(`Category "${element.category}" not found`);
        }

        const product = new Products();
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        product.imgUrl = element.imgUrl;
        product.stock = element.stock;
        product.category = category; // Relaciono una instancia del repositorio, sino no hay relación

        await this.productsRepository
          .createQueryBuilder()
          .insert()
          .into(Products)
          .values(product)
          .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
          .execute();
      }),
    );

    return 'Products added';
  }
  async getProductById(id: string) {
    return this.productsRepository.findOne({ where: { id } });
  }
  async deleteProduct(id: string) {
    // Busca el producto por su ID
    const product = await this.productsRepository.findOne({
      where: { id },
    });
    if (!product) {
      return null;
    }
    await this.productsRepository.delete(id);
    return { message: `Product with ID ${id} has been deleted` };
  }
}

// createProduct(product: Omit<Product, 'id'>): Product {
//   return this.productRepository.createProduct(product);
// }

// }
