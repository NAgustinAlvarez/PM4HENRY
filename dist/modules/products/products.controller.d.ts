import { ProductsService } from './products.service';
import { Products } from './product.entity';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getProducts(page?: string, limit?: string): Promise<Products[]>;
    addProducts(): Promise<string>;
    getProductById(id: string): Promise<Products>;
    putUsers(id: string, product: Partial<Products>): Promise<{
        id: string;
        name: string;
        description: string;
        price: number;
        stock: number;
        imgUrl: string;
        category: import("../categories/entities/category.entity").Categories;
        orderDetails: import("../orderDetail/entity/order.detail.entity").OrderDetails[];
    }>;
    deleteUsers(id: string): Promise<{
        message: string;
    }>;
}
