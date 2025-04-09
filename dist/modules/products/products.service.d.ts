import { OnModuleInit } from '@nestjs/common';
import { Products } from './product.entity';
import { Repository } from 'typeorm';
import { Categories } from 'src/modules/categories/entities/category.entity';
import { CategoriesService } from '../categories/categories.service';
export declare class ProductsService implements OnModuleInit {
    private productsRepository;
    private categoriesRepository;
    private readonly categoriesService;
    private readonly logger;
    constructor(productsRepository: Repository<Products>, categoriesRepository: Repository<Categories>, categoriesService: CategoriesService);
    onModuleInit(): Promise<void>;
    private seedProducts;
    buyProduct(id: string): Promise<number>;
    modifiedProduct(id: string, product: Partial<Products>): Promise<{
        id: string;
        name: string;
        description: string;
        price: number;
        stock: number;
        imgUrl: string;
        category: Categories;
        orderDetails: import("../orderDetail/entity/order.detail.entity").OrderDetails[];
    } | null>;
    getProducts(page: number, limit: number): Promise<Products[]>;
    addProduct(): Promise<string>;
    getProductById(id: string): Promise<Products | null>;
    deleteProduct(id: string): Promise<{
        message: string;
    } | null>;
}
