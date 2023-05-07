const createItemValidator = {
    name: "required|string|between:1,255",
    price: "required|numeric|min:0.01",
    quantity: "required|string|between:1,255",
    description: "required|string",
    subcategoryId: "integer"
}

const getItemByIdValidator = {
    id: "required|integer"
}

const updateItemValidator = {
    id: "required|integer",
    name: "required|string|between:1,255",
    price: "required|numeric|min:0.01",
    quantity: "required|string|between:1,255",
    description: "required|string",
    subcategoryId: "integer"
}

const deleteItemValidator = {
    id: "required|integer"
}

const createTagValidator = {
    name: "required|string|between:1,255",
    bgColor: ["required", "string", "regex:^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"],
    fgColor: ["required", "string", "regex:^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"],
    icon: "required|string"
}

const getTagByIdValidator = {
    id: "required|integer"
}

const updateTagValidator = {
    id: "required|integer",
    name: "required|string|between:1,255",
    bgColor: ["required", "string", "regex:^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"],
    fgColor: ["required", "string", "regex:^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"],
    icon: "required|string"
}

const deleteTagValidator = {
    id: "required|integer"
}

const assignTagToItemValidator = {
    tagId: "required|integer",
    menuItemId: "required|integer"
}

const createCategoryValidator = {
    name: "required|string"
}

const getCategoryByIdValidator = {
    id: "required|integer"
}

const updateCategoryValidator = {
    name: "required|string|between:1,255",
    id: "required|integer"
}

const deleteCategoryValidator = {
    id: "required|integer"
}

const createSubcategoryValidator = {
    name: "required|string",
    categoryId: "required|integer"
}

const getSubcategoryByIdValidator = {
    id: "required|integer"
}

const updateSubcategoryValidator = {
    name: "required|string|between:1,255",
    id: "required|integer",
    categoryId: "required|integer"
}

const deleteSubcategoryValidator = {
    id: "required|integer"
}

module.exports = {
    createItemValidator,
    getItemByIdValidator,
    updateItemValidator,
    deleteItemValidator,
    createTagValidator,
    getTagByIdValidator,
    updateTagValidator,
    deleteTagValidator,
    assignTagToItemValidator,
    createCategoryValidator,
    getCategoryByIdValidator,
    updateCategoryValidator,
    deleteCategoryValidator,
    createSubcategoryValidator,
    getSubcategoryByIdValidator,
    updateSubcategoryValidator,
    deleteSubcategoryValidator
}
