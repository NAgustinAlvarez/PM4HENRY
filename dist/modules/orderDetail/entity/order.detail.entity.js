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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetails = void 0;
const openapi = require("@nestjs/swagger");
const order_entity_1 = require("../../orders/entity/order.entity");
const product_entity_1 = require("../../products/product.entity");
const typeorm_1 = require("typeorm");
let OrderDetails = class OrderDetails {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, price: { required: true, type: () => Number }, products: { required: true, type: () => [require("../../products/product.entity").Products] }, order: { required: true, type: () => require("../../orders/entity/order.entity").Orders } };
    }
};
exports.OrderDetails = OrderDetails;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OrderDetails.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OrderDetails.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => product_entity_1.Products, (product) => product.orderDetails),
    (0, typeorm_1.JoinTable)({
        name: 'ORDER_DETAIL_PRODUCTS',
    }),
    __metadata("design:type", Array)
], OrderDetails.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => order_entity_1.Orders, (order) => order.orderDetails),
    __metadata("design:type", order_entity_1.Orders)
], OrderDetails.prototype, "order", void 0);
exports.OrderDetails = OrderDetails = __decorate([
    (0, typeorm_1.Entity)({ name: 'ORDER_DETAILS' })
], OrderDetails);
//# sourceMappingURL=order.detail.entity.js.map