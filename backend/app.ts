import express from 'express';
import session from 'express-session'
import cors from 'cors';
import authRouter from './routes/auth.js'
import contentRouter from './routes/content.js'
import connectMongo from "connect-mongo";



import notFoundMiddleware from './middlewares/notfound404.js';
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.DB_PATH as string, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then(() => {
    console.log("Mongoose connected to %s database", process.env.DB_PATH);
    app.listen(port, () => {
      console.log('Сервер запущен. Порт:', port);
    });
  })
  .catch((err) => {
    console.log("Database connection error", err.message);
  });

const app = express();

const MongoStore = connectMongo(session);
const sessionStore = new MongoStore({
  mongooseConnection: mongoose.createConnection(process.env.SESSION_DB_PATH as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }),
});
const corsOptions = {
  origin: '*',
  methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS",
  credentials: true,
  allowedHeaders: "Content-Type, Authorization, X-Requested-With",
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// UserSession
interface UserSession {
  userId: string,
  userName: string,
}
declare module 'express-session' {
  interface SessionData {
    user: UserSession;
  }
}

app.use(
  session({
    name: 'sid',
    secret: process.env.SESSION_SECRET as string,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      //process.env.NODE_ENV === 'production'
      secure: process.env.NODE_ENV === 'development',
      maxAge: 1000 * 60 * 60 * 24 * 365,
    },
  }),
);

// GraphQL

import {resolvers} from './types/resolvers.js'
// import * as bodyParser from "body-parser";
// import * as path from "path";
// import { loadSchemaSync } from '@graphql-tools/load'; // the same as import { importSchema } from 'graphql-import';
import { ApolloServer, gql }  from 'apollo-server-express';

const typeDefs = gql`
type signUpType {
  userId: String,
  name: String,
  password: String,
  email: String,
  message: String,
}
input signUpInput {
  userId: String,
  name: String, 
  password: String, 
  email: String,
  message: String,
}
type signInType {
  userId: String,
  name: String, 
  password: String,
  email: String
  message: String,
  userName: String,
}
input signInInput {
  userId: String,
  name: String, 
  password: String, 
  email: String,
  message: String,
  userName: String,
}
type Query {
  signout: String
  check: String
}
type Mutation {
  signUp(input: signUpInput): signUpType
  signIn(input: signInInput ): signInType
}
`;  // const typeDefs = loadSchemaSync(path.join(__dirname, './schema.graphql'));

const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  tracing: true, 
  context: ({ req }) => {
    return {
      req
    };
  } 
});
server.applyMiddleware({ app });

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

const port = process.env.PORT as string ?? 3100;

