import { sequelize } from '../dbSequelize.js';
import pkg from 'sequelize';
var DataTypes = pkg.DataTypes;
export var userModel = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
});
export var basketModel = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    prod: { type: DataTypes.ARRAY(DataTypes.STRING) }
});
export var productModel = sequelize.define('product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
});
userModel.belongsTo(basketModel); // userModel.getbasketModel()
basketModel.belongsTo(productModel); // basketModel.getproductModel()
productModel.hasOne(basketModel);
