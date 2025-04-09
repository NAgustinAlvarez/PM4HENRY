"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ProductsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./product.entity");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("../categories/entities/category.entity");
const data = require("../../data.json");
const categories_service_1 = require("../categories/categories.service");
let ProductsService = ProductsService_1 = class ProductsService {
    constructor(productsRepository, categoriesRepository, categoriesService) {
        this.productsRepository = productsRepository;
        this.categoriesRepository = categoriesRepository;
        this.categoriesService = categoriesService;
        this.logger = new common_1.Logger(ProductsService_1.name);
    }
    async onModuleInit() {
        const categoriesCount = await this.categoriesRepository.count();
        if (categoriesCount === 0) {
            await this.categoriesService.addCategories();
        }
        await this.seedProducts();
    }
    async seedProducts() {
        try {
            const productsCount = await this.productsRepository.count();
            if (productsCount === 0) {
                this.logger.log('Iniciando carga inicial de productos...');
                await this.addProduct();
                this.logger.log('Productos cargados exitosamente');
            }
            else {
                this.logger.log('Ya existen productos en la base de datos, omitiendo carga inicial');
            }
        }
        catch (error) {
            this.logger.error('Error al cargar productos iniciales:', error);
            throw error;
        }
    }
    async buyProduct(id) {
        const product = await this.productsRepository.findOne({ where: { id } });
        if (!product || product.stock == 0) {
            throw new Error('Producto agotado');
        }
        await this.productsRepository.update(id, { stock: product.stock - 1 });
        return product?.price;
    }
    async modifiedProduct(id, product) {
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
    async getProducts(page, limit) {
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
        const typedData = data;
        if (!Array.isArray(typedData)) {
            throw new Error('Los datos no son un array válido');
        }
        const categories = await this.categoriesRepository.find();
        await Promise.all(typedData.map(async (element) => {
            const category = categories.find((category) => category.name === element.category);
            if (!category) {
                throw new Error(`Categoría "${element.category}" no encontrada`);
            }
            const product = new product_entity_1.Products();
            product.name = element.name;
            product.description = element.description;
            product.price = element.price;
            product.imgUrl = element.imgUrl;
            product.stock = element.stock;
            product.category = category;
            await this.productsRepository
                .createQueryBuilder()
                .insert()
                .into(product_entity_1.Products)
                .values(product)
                .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
                .execute();
        }));
        return 'Productos agregados';
    }
    async getProductById(id) {
        return this.productsRepository.findOne({ where: { id } });
    }
    async deleteProduct(id) {
        const product = await this.productsRepository.findOne({
            where: { id },
        });
        if (!product) {
            return null;
        }
        await this.productsRepository.delete(id);
        return { message: `Producto con ID ${id} ha sido eliminado` };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = ProductsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Products)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Categories)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        categories_service_1.CategoriesService])
], ProductsService);
//# sourceMappingURL=products.service.js.map