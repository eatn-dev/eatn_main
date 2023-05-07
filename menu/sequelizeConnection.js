const fs = require("fs")
const path = require("path")
const { Sequelize, DataTypes } = require("sequelize")
// const { Sequelize } = require("sequelize")

const sequelize = new Sequelize(process.env.DB_URI, {
    logging: false
})

const db = {}
const models = path.join(__dirname, "models") // path to a models' folder

fs.readdirSync(models)
    .filter((file) => {
        return (file.indexOf(".") !== 0)  && (file.slice(-3) === ".js")
    })
    .forEach((file) => {
        var model = require(path.join(models, file))(sequelize, DataTypes)
        // var model = require(path.join(models, file))
        db[model.name] = model
    })

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
