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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
const inversify_1 = require("inversify");
const cache_exception_1 = require("../exceptions/cache-exception");
const redis_1 = __importDefault(require("redis"));
const config_1 = __importDefault(require("config"));
let CacheService = class CacheService {
    constructor() {
        this.client = redis_1.default.createClient({
            host: config_1.default.get('redis.appCache.host'),
            port: config_1.default.get('redis.appCache.port')
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.client.get(key, (error, data) => {
                    if (error)
                        reject(new cache_exception_1.CacheException(501, error === null || error === void 0 ? void 0 : error.message));
                    resolve(data);
                });
            });
        });
    }
    set(key, value, timeout = 3600) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.client.setex(key, timeout, value, (error) => {
                    if (error)
                        reject(new cache_exception_1.CacheException(501, error.message));
                    resolve();
                });
            });
        });
    }
};
CacheService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], CacheService);
exports.CacheService = CacheService;
