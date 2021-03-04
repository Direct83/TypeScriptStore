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
var _a;
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import authRouter from './routes/auth.js';
import contentRouter from './routes/content.js';
import connectMongo from "connect-mongo";
import { graphqlHTTP } from 'express-graphql'; // GraphQL
import { schema } from './routes/schema.js';
import notFoundMiddleware from './middlewares/notfound404.js';
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(process.env.DB_PATH, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then(function () {
    console.log("Mongoose connected to %s database", process.env.DB_PATH);
    app.listen(port, function () {
        console.log('Сервер запущен. Порт:', port);
    });
})
    .catch(function (err) {
    console.log("Database connection error", err.message);
});
var app = express();
var MongoStore = connectMongo(session);
var sessionStore = new MongoStore({
    mongooseConnection: mongoose.createConnection(process.env.SESSION_DB_PATH, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }),
});
var corsOptions = {
    origin: '*',
    methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization, X-Requested-With",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    name: 'sid',
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        //process.env.NODE_ENV === 'production'
        secure: process.env.NODE_ENV === 'development',
        maxAge: 1000 * 60 * 60 * 24 * 365,
    },
}));
import { UserModel } from './models/user.model.js';
var root = {
    getAllUsers: function () { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, UserModel.find({})];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, user];
            }
        });
    }); },
    createUser: function (test) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, name, password, email, user;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = test.input, name = _a.name, password = _a.password, email = _a.email;
                    return [4 /*yield*/, UserModel.create({
                            name: name,
                            email: email,
                            password: password,
                        })];
                case 1:
                    user = _b.sent();
                    return [2 /*return*/, { id: user.id, name: user.name, email: user.email }
                        // res.json({ userId: user.id, userName: user.name })
                        // return res.json({ message: "все не ок", error: error.message });
                        // return {
                        //   name: test.input.name,
                        //   password: test.input.password,
                        //   email: test.input.email
                        // }
                    ];
            }
        });
    }); },
};
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root
})); // GraphQL
app.use('/auth', authRouter);
app.use('/content', contentRouter);
app.use(notFoundMiddleware);
var port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3100;
