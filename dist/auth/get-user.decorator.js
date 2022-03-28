"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
exports.GetUser = common_1.createParamDecorator((data, req) => {
    if (data) {
        return req.user[data];
    }
    return req.user;
});
//# sourceMappingURL=get-user.decorator.js.map