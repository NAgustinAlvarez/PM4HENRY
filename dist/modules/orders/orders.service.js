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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./entity/order.entity");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/user.entity");
const orderDetail_service_1 = require("../orderDetail/orderDetail.service");
const product_entity_1 = require("../products/product.entity");
const order_detail_entity_1 = require("../orderDetail/entity/order.detail.entity");
let OrdersService = class OrdersService {
    async findOne(id) {
        const order = await this.orderRepository.findOne({ where: { id } });
        if (!order) {
            return order;
        }
        const orderDetail = await this.orderDService.findOneByOrderId(order.id, [
            'products',
            'order',
        ]);
        return orderDetail;
    }
    constructor(orderRepository, orderDetailRepository, userRepository, productRepository, orderDService) {
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.orderDService = orderDService;
    }
    async create(createOrderDto) {
        const { userId, products } = createOrderDto;
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.HttpException('Usuario no encontrado', common_1.HttpStatus.NOT_FOUND);
        }
        const validProducts = await this.validatedProducts(products);
        const total = await this.calculateTotal(validProducts);
        const queryRunner = this.orderRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const order = this.orderRepository.create({ user, date: new Date() });
            const orderEntity = await queryRunner.manager.save(order);
            const orderDetail = this.orderDetailRepository.create({
                order: orderEntity,
                products: validProducts,
                price: total,
            });
            const orderDetailEntity = await queryRunner.manager.save(orderDetail);
            await this.updateProductsStock(validProducts);
            await queryRunner.commitTransaction();
            return orderDetailEntity;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException('Error al crear la orden', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        finally {
            await queryRunner.release();
        }
    }
    async updateProductsStock(products) {
        for (const product of products) {
            const productEntity = await this.productRepository.findOne({
                where: { id: product.id },
            });
            if (!productEntity) {
                throw new common_1.HttpException(`Producto con ID ${product.id} no encontrado`, common_1.HttpStatus.NOT_FOUND);
            }
            if (productEntity.stock <= 0) {
                throw new common_1.HttpException(`Producto con ID ${product.id} no tiene suficiente stock`, common_1.HttpStatus.BAD_REQUEST);
            }
            const updatedStock = productEntity.stock - 1;
            await this.productRepository.update(product.id, { stock: updatedStock });
            console.log(`Stock actualizado para producto ID ${product.id}: ${updatedStock}`);
        }
    }
    async calculateTotal(products) {
        let total = 0;
        for (const product of products) {
            const productEntity = await this.productRepository.findOne({
                where: { id: product.id },
            });
            if (!productEntity) {
                throw new common_1.HttpException(`Producto con ID ${product.id} no encontrado`, common_1.HttpStatus.NOT_FOUND);
            }
            const price = parseFloat(productEntity.price.toString());
            if (isNaN(price)) {
                throw new common_1.HttpException(`El precio del producto con ID ${product.id} no es válido`, common_1.HttpStatus.BAD_REQUEST);
            }
            total += price;
        }
        return total;
    }
    async validatedProducts(products) {
        const validProducts = [];
        for (const product of products) {
            const productEntity = await this.productRepository.findOne({
                where: { id: product.id },
            });
            if (!productEntity) {
                throw new common_1.HttpException(`Producto con ID ${product.id} no encontrado`, common_1.HttpStatus.NOT_FOUND);
            }
            if (productEntity.stock <= 0) {
                throw new common_1.HttpException(`Producto con ID ${product.id} no tiene suficiente stock`, common_1.HttpStatus.BAD_REQUEST);
            }
            validProducts.push(productEntity);
        }
        return validProducts;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(order_entity_1.Orders)),
    __param(1, (0, typeorm_2.InjectRepository)(order_detail_entity_1.OrderDetails)),
    __param(2, (0, typeorm_2.InjectRepository)(user_entity_1.Users)),
    __param(3, (0, typeorm_2.InjectRepository)(product_entity_1.Products)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        orderDetail_service_1.OrderDetailService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map