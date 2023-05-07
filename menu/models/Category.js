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
            allowNull: false,
            unique: true
        }
    }, {
        underscored: true,
        tableName: "categories"
    })
    
    Category.associate = (models) => {
        Category.hasMany(models.Subcategory, {
            foreignKey: {
                allowNull: false,
                // this foreign key field will be underscored in db
                // because of model option `underscored: true`, 
                // but it won't be underscored in code
                name: "categoryId"
            },
            as: "subcategories"
        })
    }

    return Category
}
