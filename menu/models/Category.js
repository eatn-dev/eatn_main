module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("Category", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        underscored: true,
        tableName: "categories"
    })

    Category.associate = (models) => {
        Category.hasMany(models.Subcategory, {
            foreignKey: "category_id"
        })
    }

    return Category
}
