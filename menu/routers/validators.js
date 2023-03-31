const createItemValidator = {
    name: "required|string|between:1,255",
    price: "required|numeric|min:0.01",
    quantity: "required|string|between:1,255",
    description: "required|string"
}

const getItemByIdValidator = {
    id: "required|integer"
}

const updateItemValidator = {
    id: "required|integer",
    name: "required|string|between:1,255",
    price: "required|numeric|min:0.01",
    quantity: "required|string|between:1,255",
    description: "required|string"
}

const deleteItemValidator = {
    id: "required|integer"
}

module.exports = { createItemValidator, getItemByIdValidator, updateItemValidator, deleteItemValidator }
