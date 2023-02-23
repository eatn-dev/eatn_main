const express = require('express')
const morgan = require('morgan');
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
const cors = require("cors")
const sequelize = require("./sequelizeConnection")
const router = require("./routers")

const app = express()

app.use(express.json())
app.use(morgan("dev"))

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Eatn - Menu items API",
            version: "1.0.0",
            description: "Menu items API for Eatn application"
        },
        servers: [
            {
                url: "http://localhost:5000"
            }
        ],
    },
    apis: [
        "./routers/index.js"
    ]
}

const specs = swaggerJsDoc(swaggerOptions)
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(specs))
app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json")
    return res.send(specs)
})

app.use("/items", router)

sequelize.authenticate()
    .then(() => {
        console.log("Connected to menu items database successfully")
        console.log("Starting db synchronization")
        sequelize.sync().then(() => {
            console.log("Db synchronization successful")
            app.listen(5000, () => {
                console.log("Menu items service listening on port 5000")
            })
        })
    }).catch((err) => {
        console.log("Unable to connect to menu items database", err)
    })
