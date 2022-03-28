"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class NotNullPipe {
    transform(value, metadata) {
        if (!value) {
            throw new common_1.BadRequestException(`${metadata.data} could not be null`);
        }
        return value;
    }
}
exports.NotNullPipe = NotNullPipe;
//# sourceMappingURL=not-null.pipe.js.map