var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var _a;
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import authRouter from './routes/auth.js';
import contentRouter from './routes/content.js';
import connectMongo from "connect-mongo";
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
// GraphQL
import { resolvers } from './types/resolvers.js';
// import * as bodyParser from "body-parser";
// import * as path from "path";
// import { loadSchemaSync } from '@graphql-tools/load'; // the same as import { importSchema } from 'graphql-import';
import { ApolloServer, gql } from 'apollo-server-express';
var typeDefs = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\ntype signUpType {\n  userId: String,\n  name: String,\n  password: String,\n  email: String,\n  message: String,\n}\ninput signUpInput {\n  userId: String,\n  name: String, \n  password: String, \n  email: String,\n  message: String,\n}\ntype signInType {\n  userId: String,\n  name: String, \n  password: String,\n  email: String\n  message: String,\n  userName: String,\n}\ninput signInInput {\n  userId: String,\n  name: String, \n  password: String, \n  email: String,\n  message: String,\n  userName: String,\n}\ntype Query {\n  signout: String\n  check: String\n}\ntype Mutation {\n  signUp(input: signUpInput): signUpType\n  signIn(input: signInInput ): signInType\n}\n"], ["\ntype signUpType {\n  userId: String,\n  name: String,\n  password: String,\n  email: String,\n  message: String,\n}\ninput signUpInput {\n  userId: String,\n  name: String, \n  password: String, \n  email: String,\n  message: String,\n}\ntype signInType {\n  userId: String,\n  name: String, \n  password: String,\n  email: String\n  message: String,\n  userName: String,\n}\ninput signInInput {\n  userId: String,\n  name: String, \n  password: String, \n  email: String,\n  message: String,\n  userName: String,\n}\ntype Query {\n  signout: String\n  check: String\n}\ntype Mutation {\n  signUp(input: signUpInput): signUpType\n  signIn(input: signInInput ): signInType\n}\n"]))); // const typeDefs = loadSchemaSync(path.join(__dirname, './schema.graphql'));
var server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    tracing: true,
    context: function (_a) {
        var req = _a.req;
        return {
            req: req
        };
    }
});
server.applyMiddleware({ app: app });
// app.use(
//   "/graphql",
//   bodyParser.json(),
//   (req, _, next) => {
//     console.log(req.session);
//     return next();
//   },
//   graphqlExpress(req => ({
//     schema,
//     context: { req }
//   }))
// );
// app.use('/graphql', graphqlHTTP({
//   graphiql: true,
//   schema,
//   rootValue: root
// })) // GraphQL
app.use('/auth', authRouter);
app.use('/content', contentRouter);
app.use(notFoundMiddleware);
var port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3100;
var templateObject_1;
