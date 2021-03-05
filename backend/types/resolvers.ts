import {UserModel, UserModelType} from '../models/user.model.js'
import bcrypt from 'bcrypt';

// interface SignUpUserInput {
//   input: {
//     name: string,
//     password: string,
//     email: string,
//   }
// }
// interface SignInUserInput {
//   input: {
//     name: string,
//     password: string,
//   }
// }

type Resolver = (parent: any, args: any, context: any, info: any) => any;
interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver;
  };
}

export const resolvers: ResolverMap = {
  Query: {
    signOut: async (_, __, { req, res, next }) => {
      // console.log('начало');
      // await req.session.destroy((err:any) => {
      //   // if (err) return next(err);
      //   console.log('до куки');
      //   res.clearCookie('sid');
      //   console.log('после куки');
      //   console.log('до ретурт');
      // });
      return { message: 'Вы успушно вышли из системы' };
    },
    check: (_, __, { req }) => {
      if (req.session.user) {
        return { ...req.session.user }
      } else {
        return { message: "Could not find cookie :(" };
      }
    }
  },
  Mutation: {
    signUp: async (_, args, { req }) => {
      const { name, password, email } = args.input; 
      console.log('name, password, email', name, password, email)
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user: UserModelType = await UserModel.create({
          name,
          email,
          password: hashedPassword,
        })
        console.log('user!!!!', user)
        req.session.user = { userId: user.id, userName: user.name }
        console.log('req.session.user', req.session.user, user.name, user.id)
        return { userId: user.id, name: user.name, }
      } catch (error) {
        return { message: "все не ок", error: error.message }
    }
    },
    signIn: async (_, args, { req }) => {
      console.log('args.input', args.input)
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
