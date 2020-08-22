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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
const http_exception_1 = require("../exceptions/http-exception");
const inversify_1 = require("inversify");
const auth_service_1 = require("../services/auth-service");
const login_exception_1 = require("../exceptions/login-exception");
const user_service_1 = require("../services/user-service");
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    login(body, request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!body.email || !body.password) {
                throw new http_exception_1.HttpException(400, 'Please enter all fields');
            }
            const user = yield this.authService.authenticate(body);
            request.login(user, (error) => {
                if (error)
                    throw new login_exception_1.LoginException(501, error.message);
                return response.status(200).json({
                    status: 200,
                    message: 'Login successfull',
                    user
                });
            });
        });
    }
    register(body, response) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!body.name || !body.email || !body.password) {
                throw new http_exception_1.HttpException(400, 'Please enter all fields');
            }
            const user = yield this.userService.creatUser(body);
            return response.status(201).json({ user, message: 'User created' });
        });
    }
    logout(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            request.logout();
            return response.status(200).json({
                status: 200,
                message: 'You have been logged out'
            });
        });
    }
};
__decorate([
    inversify_express_utils_1.httpPost('/login'),
    __param(0, inversify_express_utils_1.requestBody()), __param(1, inversify_express_utils_1.request()), __param(2, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    inversify_express_utils_1.httpPost('/register'),
    __param(0, inversify_express_utils_1.requestBody()), __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    inversify_express_utils_1.httpPost('/logout'),
    inversify_express_utils_1.httpGet('/logout'),
    __param(0, inversify_express_utils_1.request()), __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
AuthController = __decorate([
    inversify_express_utils_1.controller('/api/auth'),
    __param(0, inversify_1.inject(auth_service_1.AuthService)),
    __param(1, inversify_1.inject(user_service_1.UserService)),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], AuthController);
exports.AuthController = AuthController;
