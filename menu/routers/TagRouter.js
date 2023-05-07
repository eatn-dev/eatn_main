const Validator = require("validatorjs")
const router = require("express").Router()
const db = require("../sequelizeConnection")
const { createTagValidator, getTagByIdValidator, updateTagValidator, deleteTagValidator } = require("./validators")

router.post("/", async (req, res) => {
    const { name, bgColor, fgColor, icon } = req.body

    const validation = new Validator(
        { name, bgColor, fgColor, icon },
        createTagValidator
    )

    if (validation.fails())
        return res.status(400).send({ data: validation.errors })

    let tag
    try {
        tag = await db.Tag.create({
            name: name,
            bgColor: bgColor,
            fgColor: fgColor,
            icon: icon
        })
    } catch (err) {
        if (err.name === "SequelizeUniqueConstraintError")
            return res.status(409).json({ data: "That name is already in use." })

        console.log(err)
        return res.sendStatus(500)
    }

    return res.json({ data: `Tag successfully created with id ${tag.id}` })
})

router.get("/", async (req, res) => {
    try{
        const tags = await db.Tag.findAll({
            // include: [
            //     {
            //         model: db.MenuItem,
            //         as: "menu_items"
            //     }
            // ]
        })

        return res.json({ data: tags})
    } catch(err) {
        console.log(err)
        return res.sendStatus(400)
    }
})

router.get("/:id", async (req, res) => {
    const id = req.params.id

    const validation = new Validator(
        { id },
        getTagByIdValidator
    )

    if (validation.fails())
        return res.status(400).send({ data: validation.errors })

    let tag
    try { 
        tag = await db.Tag.findOne({
            where: {
                id: id
            },
            // include: [
            //     {
            //         model: db.MenuItem,
            //         as: "menu_items"
            //     }
            // ]
        })
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }

    if (!tag)
        return res.sendStatus(404)

    return res.json({ data: tag })
})

router.put("/:id", async (req, res) => {
    const id = req.params.id
    const { name, bgColor, fgColor, icon } = req.body

    const validation = new Validator(
        { id, name, bgColor, fgColor, icon },
        updateTagValidator
    )

    if (validation.fails())
        return res.status(400).send({ data: validation.errors })

    let returning
    try {
        returning = await db.Tag.update(
            {
                name: name,
                bgColor: bgColor,
                fgColor: fgColor,
                icon: icon
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

router.delete("/:id", async (req, res) => {
    const id = req.params.id

    const validation = new Validator(
        { id },
        deleteTagValidator
    )

    if (validation.fails())
        return res.status(400).send({ data: validation.errors })

    let returning
    try {
        returning = await db.Tag.destroy({
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

    return res.json({ data: "Tag successfully deleted." })
})

module.exports = router
