import { sequelize } from '../dbSequelize.js'
import pkg, { Model } from 'sequelize'
const { DataTypes } = pkg

export const userModel = sequelize.define<Model<{ id?: Number, name: String, email: String, password: String }>>('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
})

export const basketModel = sequelize.define<Model<{ id?: Number, prod: Array<String>,}>>('basket', {
  id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true, allowNull: false},
  prod: {type: DataTypes.ARRAY(DataTypes.STRING)}
})

export const productModel = sequelize.define<Model<{ id?: Number, name: any, price: any, img: any }>>('product', {
  id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique:true, allowNull: false},
  price: {type: DataTypes.INTEGER, allowNull: false},
  img: {type: DataTypes.STRING, allowNull: false},
})

userModel.belongsTo(basketModel) // userModel.getbasketModel()

basketModel.belongsTo(productModel) // basketModel.getproductModel()

productModel.hasOne(basketModel)
