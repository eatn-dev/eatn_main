const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_URI, {
    logging: false
})

module.exports = sequelize;