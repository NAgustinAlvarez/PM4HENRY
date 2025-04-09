"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const globalLogger_middleware_1 = require("./middlewares/globalLogger.middleware");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.use(globalLogger_middleware_1.loggerGlobal);
        app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
        const PORT = process.env.PORT ?? 3000;
        const swaggerConfig = new swagger_1.DocumentBuilder()
            .setTitle('Ecommerce-demo')
            .setDescription('Proyecto de backend Henry M4')
            .addBearerAuth()
            .setVersion('1.0')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
        swagger_1.SwaggerModule.setup('api', app, document);
        await app.listen(PORT);
        console.log(` Servidor corriendo en http://localhost:${PORT}`);
    }
    catch (error) {
        console.error(' Error al iniciar el servidor:', error);
    }
}
void bootstrap();
//# sourceMappingURL=main.js.map