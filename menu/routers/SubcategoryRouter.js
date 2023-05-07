const Validator = require("validatorjs")
const router = require("express").Router()
const db = require("../sequelizeConnection")
const { createSubcategoryValidator, getSubcategoryByIdValidator, updateSubcategoryValidator, deleteSubcategoryValidator } = require("./validators")

router.post("/", async (req, res) => {
    const { name, categoryId } = req.body

    const validation = new Validator(
        { name, categoryId },
        createSubcategoryValidator
    )

    if (validation.fails())
        return res.status(400).send({ data: validation.errors })
        
    // check if parent category exists
    let category
    try  {
        category = await db.Category.findOne({
            where: {
                id: categoryId
            }
        })

        if (!category)
            return res.status(404).json({ data: "Category with provided id does not exist." })
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
        
    let subcategory
    try {
        subcategory = await db.Subcategory.create({
            name: name,
            categoryId: category.id
        })
    } catch (err) {
        if (err.name === "SequelizeUniqueConstraintError")
            return res.status(409).json({ data: "That name is already in use." })
            
        console.log(err)
        return res.sendStatus(500)
    }

    return res.json({data: `Subcategory succesfuly created with id ${subcategory.id}`})
})

router.get("/", async (req, res) => {
    let subcategories
    try {
        subcategories = await db.Subcategory.findAll({
            attributes: {
                exclude: ["categoryId"]
            },
            include: [
                {
                    model: db.MenuItem,
                    as: "menu_items",
                    attributes: {
                        exclude: ["subcategoryId"]
                    }
                },
                {
                    model: db.Category,
                    as: "category"
                }
            ]
        })
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }

    return res.json({ data: subcategories})
})

router.get("/:id", async (req, res) => {
    const id = req.params.id

    const validation = new Validator(
        { id },
        getSubcategoryByIdValidator
    )

    if (validation.fails())
        return res.status(400).send({ data: validation.errors })

    let subcategory
    try{
        subcategory = await db.Subcategory.findOne({
            attributes: {
                exclude: ["categoryId"]
            },
            where: {
                id: id
            },
            include: [
                {
                    model: db.MenuItem,
                    as: "menu_items",
                    attributes: {
                        exclude: ["subcategoryId"]
                    }
                }
            ]
        })
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }

    if (!subcategory)
        return res.sendStatus(404)

    return res.json({ data: subcategory })
})

router.put("/:id", async (req, res) => {
    const id = req.params.id
    const { name, categoryId } = req.body

    const validation = new Validator(
        { id, name, categoryId },
        updateSubcategoryValidator
    )

    if (validation.fails())
        return res.status(400).send({ data: validation.errors })

    // check if parent category exists
    let category
    try {
        category = await db.Category.findOne({
            where: {
                id: categoryId
            }
        })
    
        if (!category)
            return res.status(404).json({ data: "Category with provided id does not exist." })
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }

    let returning
    try {
        returning = await db.Subcategory.update(
            {
                id: id,
                name: name,
                categoryId: categoryId
            },
            {
                where: {
                    id: id
                },
                returning: true
            }
        )
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }

    if (returning[0] !== 1)
        return res.sendStatus(404)

    return res.json({ data: "Subcategory successfully updated." })
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id

    const validation = new Validator(
        { id },
        deleteSubcategoryValidator
    )

    if (validation.fails())
        return res.status(400).send({ data: validation.errors })

    let returning
    try {
        returning = await db.Subcategory.destroy({
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

    return res.json({ data: "Subcategory successfully deleted." })
})

module.exports = router
