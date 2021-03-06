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
exports.AuthService = void 0;
const inversify_1 = require("inversify");
const bcryptjs_1 = require("bcryptjs");
const user_notfound_exception_1 = require("../exceptions/user-notfound-exception");
const user_service_1 = require("./user-service");
const invalid_credentials_exception_1 = require("../exceptions/invalid-credentials-exception");
let AuthService = class AuthService {
    constructor(userService) {
        this.userService = userService;
    }
    authenticate({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findByEmail(email);
            if (!user) {
                throw new user_notfound_exception_1.UserNotFoundException(404, 'User not found with email ' + email);
            }
            if (!(yield bcryptjs_1.compare(password, user.password))) {
                throw new invalid_credentials_exception_1.InvalidCredentialsException(401, 'Invalid credentials');
            }
            return user;
        });
    }
    sendForgotPasswordEmail() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
};
AuthService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(user_service_1.UserService)),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
