const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const sequelize = require("./sequelizeConnection").sequelize

const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

const MenuItemRouter = require("./routers/MenuItemRouter")
const TagRouter = require("./routers/TagRouter")
const CategoryRouter = require("./routers/CategoryRouter")
const SubcategoryRouter = require("./routers/SubcategoryRouter")

app.use("/items", MenuItemRouter)
app.use("/tags", TagRouter)
app.use("/categories", CategoryRouter)
app.use("/subcategories", SubcategoryRouter)

sequelize.authenticate()
    .then(() => {
        console.log("Connected to menu items database successfully")
        console.log("Starting db synchronization")
        sequelize.sync().then(() => {
            console.log("Db synchronization successful")
            app.listen(5000, () => {
                console.log("Menu items service listening on http://localhost:5000")
            })
        })
    }).catch((err) => {
        console.log("Unable to connect to menu items database", err)
    })
