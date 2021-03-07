import { UserModel, UserModelType } from '../models/user.model.js'
import bcrypt from 'bcrypt';

type Resolver = (parent: any, args: any, context: any, info: any) => any;

interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver;
  };
}

export const resolvers: ResolverMap = {
  Query: {
    check: (_, __, { req }) => {
      if (req.session.user) {
        return { ...req.session.user }
      } else {
        return { message: "Could not find cookie :(" };
      }
    }
  },
  Mutation: {
    signOut: async (_, __, { req, res, next }) => {
      try {
        req.session.destroy();
        res.clearCookie('sid');
      } catch (error) {
        return { message: 'Ошибка выхода' }
      }
      return { message: 'Вы успeшно вышли из системы' };
    },
    signUp: async (_, args, { req }) => {
      const { name, password, email } = args.input;
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user: UserModelType = await UserModel.create({
          name,
          email,
          password: hashedPassword,
        })
        req.session.user = { userId: user.id, userName: user.name }
        return { userId: user.id, userName: user.name, }
      } catch (error) {
        return { message: "все не ок", error: error.message }
      }
    },
    signIn: async (_, args, { req }) => {
      const { name, password } = args.input;
      try {
        const user = await UserModel.findOne({ name }).exec();
        if (!user) {
          return { message: 'все не ок c Именем' }
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          return { message: 'все не ок c Паролем' }
        }
        req.session.user = { userId: user.id, userName: user.name };
        return { userId: user.id, userName: user.name }
      } catch (error) {
        return { message: "все не ок", error: error.message }
      }
    },
  }
};
