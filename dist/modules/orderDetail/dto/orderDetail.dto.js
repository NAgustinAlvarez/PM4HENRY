"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetailDto = void 0;
const openapi = require("@nestjs/swagger");
class OrderDetailDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { price: { required: true, type: () => Number }, products: { required: true, type: () => [Object] }, order: { required: true, type: () => require("../../orders/entity/order.entity").Orders } };
    }
}
exports.OrderDetailDto = OrderDetailDto;
//# sourceMappingURL=orderDetail.dto.js.map