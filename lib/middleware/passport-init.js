"use strict";
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
exports.deserializeUser = exports.serializeUser = exports.strategy = void 0;
const passport_local_1 = require("passport-local");
const user_model_1 = require("../models/user-model");
const bcryptjs_1 = require("bcryptjs");
exports.strategy = new passport_local_1.Strategy((email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'User not found with given email' });
        }
        if (!bcryptjs_1.compare(password, user.password)) {
            return done(null, false, { message: 'Invalid credentials' });
        }
        return done(null, user);
    }
    catch (err) {
        done(err, null);
    }
}));
exports.serializeUser = (user, done) => {
    done(null, user.id);
};
exports.deserializeUser = (id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.findById(id);
        done(null, user);
    }
    catch (err) {
        done(err, null);
    }
});
