const { DataTypes } = require('sequelize');

const sequelize = require("../sequelizeConnection");

const MenuItem = sequelize.define("MenuItem", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false,
        validate: {
            min: 0.01
        }
    },
    quantity: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
})

module.exports = MenuItem