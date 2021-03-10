var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { gql } from 'apollo-server-express';
export var typeDefs = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\ntype itemObj {\n  id: String,\n  name: String,\n  price: String,\n  img: String,\n}\ntype getItemsType {\n  message: String,\n  items: [itemObj],\n  itemsLength: Int,\n}\ninput getItemsInput {\n  page: Int,\n  limit: Int,\n}\ntype signUpType {\n  userId: String,\n  userName: String,\n  name: String,\n  password: String,\n  email: String,\n  message: String,\n}\ninput signUpInput {\n  userId: String,\n  userName: String,\n  name: String,\n  password: String,\n  email: String,\n  message: String,\n}\ntype signInType {\n  userId: String,\n  name: String,\n  password: String,\n  email: String\n  message: String,\n  userName: String,\n}\ninput signInInput {\n  userId: String,\n  name: String,\n  password: String,\n  email: String,\n  message: String,\n  userName: String,\n}\ninput signOut {\n  message: String\n}\ntype getBasketType {\n  message: String,\n  basket: [itemObj],\n}\ninput basket {\n  userId: String\n}\ntype Message {\n  message:String,\n  userId:String,\n  userName:String,\n}\ntype Query {\n  check: Message\n}\ntype MessageAddItem {\n  message:String,\n}\ninput addItemInput{\n  idProd: String,\n  userId: String,\n}\ntype Mutation {\n  signUp(input: signUpInput): signUpType\n  signIn(input: signInInput ): signInType\n  getItems(input: getItemsInput ): getItemsType\n  getBasket(input: basket ): getBasketType\n  addItem(input: addItemInput): MessageAddItem\n  signOut(input: signOut): signInType\n}\n"], ["\ntype itemObj {\n  id: String,\n  name: String,\n  price: String,\n  img: String,\n}\ntype getItemsType {\n  message: String,\n  items: [itemObj],\n  itemsLength: Int,\n}\ninput getItemsInput {\n  page: Int,\n  limit: Int,\n}\ntype signUpType {\n  userId: String,\n  userName: String,\n  name: String,\n  password: String,\n  email: String,\n  message: String,\n}\ninput signUpInput {\n  userId: String,\n  userName: String,\n  name: String,\n  password: String,\n  email: String,\n  message: String,\n}\ntype signInType {\n  userId: String,\n  name: String,\n  password: String,\n  email: String\n  message: String,\n  userName: String,\n}\ninput signInInput {\n  userId: String,\n  name: String,\n  password: String,\n  email: String,\n  message: String,\n  userName: String,\n}\ninput signOut {\n  message: String\n}\ntype getBasketType {\n  message: String,\n  basket: [itemObj],\n}\ninput basket {\n  userId: String\n}\ntype Message {\n  message:String,\n  userId:String,\n  userName:String,\n}\ntype Query {\n  check: Message\n}\ntype MessageAddItem {\n  message:String,\n}\ninput addItemInput{\n  idProd: String,\n  userId: String,\n}\ntype Mutation {\n  signUp(input: signUpInput): signUpType\n  signIn(input: signInInput ): signInType\n  getItems(input: getItemsInput ): getItemsType\n  getBasket(input: basket ): getBasketType\n  addItem(input: addItemInput): MessageAddItem\n  signOut(input: signOut): signInType\n}\n"])));
var templateObject_1;
