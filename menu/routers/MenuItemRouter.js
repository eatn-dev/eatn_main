const Validator = require("validatorjs")
const router = require("express").Router()
const sequelize = require("sequelize")
const parseOData = require("odata-sequelize")
const MenuItem = require("../models/MenuItem")
const { createItemValidator, getItemByIdValidator, updateItemValidator, deleteItemValidator } = require("./validators")

// swagger MenuItem schema
/**
 * @swagger
 * components:
 *   schemas:
 *     MenuItem:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - quantity
 *         - description
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto generated id of menu item
 *         name:
 *           type: string
 *           description: Menu item name
 *         price:
 *           type: number
 *           multipleOf: 0.01
 *           description: Menu item price
 *         quantity:
 *           type: string
 *           description: Menu item quantity
 *         description:
 *           type: string
 *           description: Menu item description
 *         createdAt:
 *           type: string
 *           description: ISO datetime of when menu item was created
 *         updatedAt:
 *           type: string
 *           description: ISO datetime of when menu item was last updated
 *       example:
 *         id: 1
 *         name: Pellegrino sparkling water
 *         price: 3.99
 *         quantity: 2.0L
 *         description: Unflavored Pellegrino sparkling water in glass bottle 
 *         createdAt: 2023-02-21T12:00:00.000Z
 *         updatedAt: 2023-02-23T15:30:00.000Z
 */

// route collection tag
/**
 * @swagger
 * tags:
 *   name: Menu items
 *   description: Menu items API route collection
 */

// create new menu item
/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create new menu item
 *     tags: [Menu items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuItem'
 *     responses:
 *       200:
 *         description: New menu item created successfully
 *         content:
 *           application/json:
 *             data: Item successfully created with id 1.
 *       400:
 *         description: Bad request body
 */
router.post("/", async (req, res) => {
    const { name, price, quantity, description } = req.body

    const validation = new Validator(
        { name, price, quantity, description },
        createItemValidator
    )

    if (validation.fails())
        return res.status(400).send({ data: validation.errors })

    const item = await MenuItem.create({
        name: name,
        price: price,
        quantity: quantity,
        description: description
    })

    return res.send({ data: `Item successfully created with id ${item.id}` })

})

// get all menu items
/**
 * @swagger
 * /items:
 *   get:
 *     summary: Returns the list of all menu items
 *     tags: [Menu items]
 *     parameters:
 *     - in: path
 *       name: seach query
 *       schema:
 *         type: string
 *       required: false
 *       description: Search query string for filtering, ordering and pagination (https://github.com/Vicnovais/odata-sequelize)
 *     responses:
 *       200:
 *         description: The list of all menu items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MenuItem'
 */
router.get("/:searchQuery?", async (req, res) => {    
    try{
        var query = req.params.searchQuery ? parseOData(
            req.params.searchQuery,
            sequelize
        ) : {}

        const items = await MenuItem.findAndCountAll(query)
        
        return res.send({ data: items })
    }
    catch(err){
        console.log(err)
        return res.send(400)
    }
})

// get menu item by id
/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Return menu item with corresponding id
 *     tags: [Menu items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Menu item id
 *     responses:
 *       200:
 *         description: Menu item with corresponding id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *       404:
 *         description: No menu item found
 */
router.get("/:id", async (req, res) => {
    const id = req.params.id

    const validation = new Validator(
        { id },
        getItemByIdValidator
    )

    if (validation.fails())
        return res.status(400).send({ data: validation.errors })

    const item = await MenuItem.findOne({
        where: {
            id: id
        }
    })

    if (!item)
        return res.sendStatus(404)

    return res.send({ data: item })
})

// update menu item
/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Update menu item with corresponding id
 *     tags: [Menu items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Menu item id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuItem'
 *     responses:
 *       200:
 *         description: Menu item updated successfully
 *         content:
 *           application/json:
 *             data: Item successfully created with id 1.
 *       400:
 *         description: Bad request body
 *       404:
 *         description: No item found
 */
router.put("/:id", async (req, res) => {
    const id = req.params.id
    const { name, price, quantity, description } = req.body

    const validation = new Validator(
        { id, name, price, quantity, description },
        updateItemValidator
    )

    if (validation.fails())
        return res.status(400).send({ data: validation.errors })

    const returning = await MenuItem.update({ name: name, price: price, quantity: quantity, description: description },
        {
            where: {
                id: id
            },
            returning: true
        })

    if (returning[0] !== 1)
        return res.sendStatus(404)

    return res.send({ data: "Menu item successfully updated." })

})

// delete menu item
/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Delete menu item with corresponding id
 *     tags: [Menu items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Menu item id
 *     responses:
 *       200:
 *         description: Menu item with corresponding id was successfully deleted
 *         content:
 *           application/json:
 *             data: Menu item successfully deleted.
 *       404:
 *         description: No menu item found
 */
router.delete("/:id", async (req, res) => {
    const id = req.params.id

    const validation = new Validator(
        { id },
        deleteItemValidator
    )

    if (validation.fails())
        return res.status(400).send({ data: validation.errors })

    const returning = await MenuItem.destroy({
        where: {
            id: id
        }
    })

    if (returning !== 1)
        return res.sendStatus(404)

    return res.send({ data: "Menu item successfully deleted." })
})

module.exports = router
