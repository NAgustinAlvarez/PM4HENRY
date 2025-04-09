import { OnModuleInit } from '@nestjs/common';
import { Categories } from './entities/category.entity';
import { Repository } from 'typeorm';
export declare class CategoriesService implements OnModuleInit {
    private categoriesRepository;
    constructor(categoriesRepository: Repository<Categories>);
    onModuleInit(): Promise<void>;
    addCategories(): Promise<void>;
    getCategories(): Promise<Categories[]>;
}
