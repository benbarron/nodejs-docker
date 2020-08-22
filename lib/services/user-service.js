"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.UserService = void 0;
const inversify_1 = require("inversify");
const user_model_1 = require("../models/user-model");
const http_exception_1 = require("../exceptions/http-exception");
let UserService = class UserService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.User.find();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.User.findById(id);
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.User.findOne({ email });
        });
    }
    creatUser(userDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.User.create(userDTO);
                return yield user.save();
            }
            catch (err) {
                throw new http_exception_1.HttpException(501, err.message);
            }
        });
    }
};
UserService = __decorate([
    inversify_1.injectable()
], UserService);
exports.UserService = UserService;
