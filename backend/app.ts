import express from 'express';
import session from 'express-session'
import cors from 'cors';
import authRouter from './routes/auth.js'
import contentRouter from './routes/content.js'
import connectMongo from "connect-mongo";
import { graphqlHTTP } from 'express-graphql';  // GraphQL

import { schema } from './routes/schema.js'

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
import {UserModel, UserModelType} from './models/user.model.js'
const root = {
  getAllUsers: async () => {
    const user = await UserModel.find({})
    return user
  },
  createUser: async (test:any) => {
    const { name, password, email } = test.input;
    const user: UserModelType = await UserModel.create({
      name,
      email,
      password,
    })
    return { id: user.id, name: user.name, email: user.email }
  },
  // singInUser: async (test:any) => {
  //   const { name, password } = test.input;

  //   const user = await UserModel.findOne({ name }).exec();
  //   if (!user) {
  //     return res.json({ message: 'все не ок c Именем' })
  //   }
  //   const isValidPassword = await bcrypt.compare(password, user.password);
  //   if (!isValidPassword) {
  //     return res.json({ message: 'все не ок c Паролем' })
  //   }
  //   req.session.user = { userId: user.id, userName: user.name };
  //   res.json({ userId: user.id, userName: user.name })
  // } catch (error) {
  //   return res.json({ message: "все не ок", error: error.message });
  // }

  //   const user: UserModelType = await UserModel.create({
  //     name,
  //     email,
  //     password,
  //   })
  //   return { id: user.id, name: user.name, email: user.email }
  // },
}
app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema,
  rootValue: root
})) // GraphQL
app.use('/auth', authRouter);
app.use('/content', contentRouter);

app.use(notFoundMiddleware);

const port = process.env.PORT as string ?? 3100;

