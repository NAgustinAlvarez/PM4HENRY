import { Injectable, OnModuleInit } from '@nestjs/common';
import * as data from '../../data.json';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './entities/category.entity';
import { Repository } from 'typeorm';

// Define the type for the elements in the data array
interface ProductData {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

// Explicitly type the imported data
const typedData: ProductData[] = data as ProductData[];

@Injectable()
export class CategoriesService implements OnModuleInit {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}
  async onModuleInit() {
    await this.addCategories();
    console.log('categorias cargadas al iniciar');
  }
  async addCategories() {
    if (!typedData) {
      throw new Error('Data is undefined or null');
    }

    await Promise.all(
      typedData.map(async (element) => {
        await this.categoriesRepository
          .createQueryBuilder()
          .insert()
          .into(Categories)
          .values({ name: element.category })
          .onConflict(`("name") DO NOTHING`)
          .execute();
      }),
    );
  }
  async getCategories() {
    return this.categoriesRepository.find();
  }
}
