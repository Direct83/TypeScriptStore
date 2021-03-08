import { sequelize } from '../dbSequelize.js'
import pkg, { Model } from 'sequelize'
const { DataTypes } = pkg

export const userModel = sequelize.define<Model<{ id?: Number, name: String, email: String, password: String }>>('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
})

