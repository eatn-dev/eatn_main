const Validator = require("validatorjs")
const router = require("express").Router()
const db = require("../sequelizeConnection")
const { createCategoryValidator, getCategoryByIdValidator, updateCategoryValidator, deleteCategoryValidator } = require("./validators")

router.post("/", async (req, res) => {
    const { name } = req.body

    const validation = new Validator(
        { name },
        createCategoryValidator
    )

    if (validation.fails())
        return res.status(400).send({ data: validation.errors })
    
    let category
    try {
        category = await db.Category.create({
            name: name
        })
    } catch (err) {
        if (err.name === "SequelizeUniqueConstraintError")
            return res.status(409).json({ data: "That name is already in use." })

        console.log(err)
        return res.sendStatus(500)
    }

    return res.json({data: `Category succesfuly created with id ${category.id}`})
})

router.get("/", async (req, res) => {
    let categories
    try {
        categories = await db.Category.findAll({
            include: [
                {
                    model: db.Subcategory,
                    as: "subcategories",
                    attributes: {
                        exclude: ["categoryId"]
                    }
                }
            ]
        })
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }

    return res.json({ data: categories})
})

router.get("/:id", async (req, res) => {
    const id = req.params.id

    const validation = new Validator(
        { id },
        getCategoryByIdValidator
    )

    if (validation.fails())
        return res.status(400).send({ data: validation.errors })

    let category
    try{
        category = await db.Category.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: db.Subcategory,
                    as: "subcategories",
                    attributes: {
                        exclude: ["categoryId"]
                    }
                }
            ]
        })
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }

    if (!category)
        return res.sendStatus(404)

    return res.json({ data: category })
})

router.put("/:id", async (req, res) => {
    const id = req.params.id
    const { name } = req.body

    const validation = new Validator(
        { id, name },
        updateCategoryValidator
    )

    if (validation.fails())
        return res.status(400).send({ data: validation.errors })

    // this is postgres feature only
    // it returns how many rows have been updated
    let returning
    try {
        returning = await db.Category.update(
            {
                id: id,
                name: name
            },
            {
                where: {
                    id: id
                },
                returning: true
            }
        )
    } catch (err) {
        if (err.name === "SequelizeUniqueConstraintError")
            return res.status(409).json({ data: "That name is already in use." })
            
        console.log(err)
        return res.sendStatus(500)
    }

    if (returning[0] !== 1)
        return res.sendStatus(404)

    return res.json({ data: "Category successfully updated." })
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id

    const validation = new Validator(
        { id },
        deleteCategoryValidator
    )

    if (validation.fails())
        return res.status(400).send({ data: validation.errors })

    let returning
    try {
        returning = await db.Category.destroy({
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

    return res.json({ data: "Category successfully deleted." })
})

module.exports = router
