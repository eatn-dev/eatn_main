const Validator = require("validatorjs")
const router = require("express").Router()
const db = require("../sequelizeConnection")
const { createItemValidator, getItemByIdValidator, updateItemValidator, deleteItemValidator, assignTagToItemValidator } = require("./validators")


// create new menu item
router.post("/", async (req, res) => {
    const { name, price, quantity, description, subcategoryId } = req.body

    const validation = new Validator(
        { name, price, quantity, description, subcategoryId },
        createItemValidator
    )

    if (validation.fails())
        return res.status(400).send({ data: validation.errors })

    // TODO: ask leon if i should have 1 try-catch per query or 1 try-catch per route

    let subcategory
    try{
        if (subcategoryId){
            subcategory = await db.Subcategory.findOne({
                where: {
                    id: subcategoryId
                }
            })
    
            if (!subcategory)
                return res.status(404).json({ data: "Subcategory with provided id does not exist." })
        }
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }

    let item
    try {
        item = await db.MenuItem.create({
            name: name,
            price: price,
            quantity: quantity,
            description: description,
            subcategoryId: subcategoryId
        })
    } catch (err) {
        if (err.name === "SequelizeUniqueConstraintError")
            return res.status(409).json({ data: "That name is already in use." })

        console.log(err)
        return res.sendStatus(500)
    }


    return res.json({ data: `Item successfully created with id ${item.id}` })

})

// get all menu items
router.get("/", async (req, res) => {   
 
    try{
        const items = await db.MenuItem.findAll({
            attributes: {
                exclude: ["subcategoryId"]
            },
            include: [
                {
                    model: db.Tag,
                    as: "tags"
                },
                {
                    model: db.Subcategory,
                    as: "subcategory",
                    attributes: {
                        exclude: ["categoryId"]
                    },
                    include : [
                        {
                            model: db.Category,
                            as: "category"
                        }
                    ]
                }
            ]
        })

        return res.json({ data: items })
    } catch(err){
        console.log(err)
        return res.sendStatus(400)
    }
})

// get menu item by id
router.get("/:id", async (req, res) => {
    const id = req.params.id

    const validation = new Validator(
        { id },
        getItemByIdValidator
    )

    if (validation.fails())
        return res.status(400).send({ data: validation.errors })

    let item
    try {
        item = await db.MenuItem.findOne({
            where: {
                id: id
            },
            attributes: {
                exclude: ["subcategoryId"]
            },
            include: [
                {
                    model: db.Tag,
                    as: "tags",
                },
                {
                    model: db.Subcategory,
                    as: "subcategory",
                    attributes: {
                        exclude: ["categoryId"]
                    },
                    include : [
                        {
                            model: db.Category,
                            as: "category"
                        }
                    ]
                }
            ]
        })
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }

    if (!item)
        return res.sendStatus(404)

    return res.json({ data: item })
})

// update menu item
router.put("/:id", async (req, res) => {
    const id = req.params.id
    const { name, price, quantity, description, subcategoryId } = req.body

    const validation = new Validator(
        { id, name, price, quantity, description, subcategoryId },
        updateItemValidator
    )

    if (validation.fails())
        return res.status(400).send({ data: validation.errors })
    
    let subcategory
    try{
        if (subcategoryId){
            subcategory = await db.Subcategory.findOne({
                where: {
                    id: subcategoryId
                }
            })
    
            if (!subcategory)
                return res.status(404).json({ data: "Subcategory with provided id does not exist." })
        }
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }

    let returning
    try {
        returning = await db.MenuItem.update(
            {
                name: name,
                price: price,
                quantity: quantity,
                description: description,
                subcategoryId: subcategoryId
            },
            {
                where: {
                    id: id
                },
                returning: true
            })
    } catch (err) {
        if (err.name === "SequelizeUniqueConstraintError")
            return res.status(409).json({ data: "That name is already in use." })
            
        console.log(err)
        return res.sendStatus(500)
    }

    if (returning[0] !== 1)
        return res.sendStatus(404)

    return res.json({ data: "Menu item successfully updated." })
})

// delete menu item
router.delete("/:id", async (req, res) => {
    const id = req.params.id

    const validation = new Validator(
        { id },
        deleteItemValidator
    )

    if (validation.fails())
        return res.status(400).send({ data: validation.errors })

    let returning
    try {
        returning = await db.MenuItem.destroy({
            where: {
                id: id
            }
        })
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }

    if (returning !== 1)
        return res.sendStatus(404)

    return res.json({ data: "Menu item successfully deleted." })
})

// assign tag to menu item
router.post("/:menuItemId/tags", async (req, res) => {
    const tagId = req.body.tagId
    const menuItemId = req.params.menuItemId

    const validation = new Validator(
        {
            tagId,
            menuItemId
        },
        assignTagToItemValidator
    )

    if (validation.fails())
        return res.status(400).send({ data: validation.errors })

    // TODO: ask leon if this try-catch coverage is okay
    try {
        const tag = await db.Tag.findOne({
            where: {
                id: tagId
            }
        })
    
        if (!tag)
            return res.sendStatus(404)
    
        const menuItem = await db.MenuItem.findOne({
            where: {
                id: menuItemId
            }
        })
    
        if (!menuItem)
            return res.sendStatus(404)
    
        // check if tag is already assigned
        const tagAlreadyAssigned = await menuItem.hasTag(tag)
    
        if (tagAlreadyAssigned){
            return res.status(409).json({ data: `Tag id ${tagId} is already assigned to this menu item.`})
        }
        
        await menuItem.addTag(tag)
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }

    return res.json({ data: `Tag with id ${tagId} successfully assigned to menu item id ${menuItemId}.` })
})

router.delete("/:menuItemId/tags/:tagId", async (req, res) => {
    const tagId = req.params.tagId
    const menuItemId = req.params.menuItemId

    const validation = new Validator(
        {
            tagId,
            menuItemId
        },
        assignTagToItemValidator
    )

    if (validation.fails())
        return res.status(400).send({ data: validation.errors })

    try {
        const tag = await db.Tag.findOne({
            where: {
                id: tagId
            }
        })
    
        if (!tag)
            return res.sendStatus(404)
    
        const menuItem = await db.MenuItem.findOne({
            where: {
                id: menuItemId
            }
        })
    
        if (!menuItem)
            return res.sendStatus(404)
    
        // check if tag is already assigned
        const tagAlreadyAssigned = await menuItem.hasTag(tag)
    
        if (!tagAlreadyAssigned){
            return res.status(404).json({ data: `Tag with id ${tagId} is not assigned to this menu item therefore you cannot unassign it.`})
        }
        
        await menuItem.removeTag(tag)
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }

    return res.json({ data: `Tag with id ${tagId} successfully unassigned from menu item id ${menuItemId}.` })
})

module.exports = router
