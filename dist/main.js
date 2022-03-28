"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
async function bootstrap() {
    const logger = new common_1.Logger('boostrapp');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets(path_1.join(__dirname, '..', 'static'));
    app.setGlobalPrefix('api');
    const port = 3000;
    await app.listen(port).then(() => {
        logger.log(`server listenning on port ${port}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map