var _a;
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import connectMongo from "connect-mongo";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { ApolloServer } from 'apollo-server-express';
import contentRouter from './routes/content.js';
import { resolvers } from './types/resolvers.js';
import { typeDefs } from './types/typeDefs.js';
import notFoundMiddleware from './middlewares/notfound404.js';
import './db/index.js';
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
var server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    tracing: true,
    context: function (_a) {
        var req = _a.req, res = _a.res;
        return {
            req: req, res: res
        };
    }
});
server.applyMiddleware({ app: app });
app.use('/content', contentRouter);
app.use(notFoundMiddleware);
var port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3100;
