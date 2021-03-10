var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import bcrypt from 'bcrypt';
import { productModel, userModel } from '../db/models/models.js';
export var resolvers = {
    Query: {
        check: function (_, __, _a) {
            var req = _a.req;
            if (req.session.user) {
                return __assign({}, req.session.user);
            }
            else {
                return { message: "Could not find cookie :(" };
            }
        }
    },
    Mutation: {
        getItems: function (_, args, _a) {
            var req = _a.req, res = _a.res, next = _a.next;
            return __awaiter(void 0, void 0, void 0, function () {
                var _b, page, limit, offset, items;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _b = args.input, page = _b.page, limit = _b.limit;
                            offset = page * limit - limit;
                            return [4 /*yield*/, productModel.findAll({ offset: offset, limit: limit, raw: true })];
                        case 1:
                            items = _c.sent();
                            return [2 /*return*/, { items: items }];
                    }
                });
            });
        },
        signOut: function (_, __, _a) {
            var req = _a.req, res = _a.res, next = _a.next;
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    try {
                        req.session.destroy();
                        res.clearCookie('sid');
                    }
                    catch (error) {
                        return [2 /*return*/, { message: 'Ошибка выхода' }];
                    }
                    return [2 /*return*/, { message: 'Вы успeшно вышли из системы' }];
                });
            });
        },
        signUp: function (_, args, _a) {
            var req = _a.req;
            return __awaiter(void 0, void 0, void 0, function () {
                var _b, name, password, email, hashedPassword, userFind, user, error_1;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _b = args.input, name = _b.name, password = _b.password, email = _b.email;
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 6, , 7]);
                            return [4 /*yield*/, bcrypt.hash(password, 10)];
                        case 2:
                            hashedPassword = _c.sent();
                            return [4 /*yield*/, userModel.findOne({ where: { name: name } })];
                        case 3:
                            userFind = _c.sent();
                            if (!(userFind === null)) return [3 /*break*/, 5];
                            return [4 /*yield*/, userModel.create({
                                    name: name,
                                    email: email,
                                    password: hashedPassword,
                                })];
                        case 4:
                            user = _c.sent();
                            req.session.user = { userId: user.getDataValue('id'), userName: user.getDataValue('name') };
                            return [2 /*return*/, { userId: user.getDataValue('id'), userName: user.getDataValue('name'), }];
                        case 5: return [2 /*return*/, { message: "пользователь уже существует в базе" }];
                        case 6:
                            error_1 = _c.sent();
                            return [2 /*return*/, { message: "все не ок", error: error_1.message }];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        },
        signIn: function (_, args, _a) {
            var req = _a.req;
            return __awaiter(void 0, void 0, void 0, function () {
                var _b, name, password, user, passwordString, isValidPassword, error_2;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _b = args.input, name = _b.name, password = _b.password;
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 5, , 6]);
                            return [4 /*yield*/, userModel.findOne({ where: { name: name } })];
                        case 2:
                            user = _c.sent();
                            if (!user) return [3 /*break*/, 4];
                            passwordString = String(user.getDataValue('password'));
                            if (!user) {
                                return [2 /*return*/, { message: 'все не ок c Именем' }];
                            }
                            return [4 /*yield*/, bcrypt.compare(password, passwordString)];
                        case 3:
                            isValidPassword = _c.sent();
                            if (!isValidPassword) {
                                return [2 /*return*/, { message: 'все не ок c Паролем' }];
                            }
                            req.session.user = { userId: user.getDataValue('id'), userName: user.getDataValue('name') };
                            return [2 /*return*/, { userId: user.getDataValue('id'), userName: user.getDataValue('name') }];
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            error_2 = _c.sent();
                            return [2 /*return*/, { message: "все не ок", error: error_2.message }];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        },
    }
};
