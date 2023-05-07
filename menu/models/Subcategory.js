module.exports = (sequelize, DataTypes) => {
    const Subcategory = sequelize.define("Subcategory", {
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
        tableName: "subcategories"
    })
    
    Subcategory.associate = (models) => {
        Subcategory.belongsTo(models.Category, {
            foreignKey: {
                allowNull: false,
                name: "categoryId"
            },
            as: "category"
        })
    
        Subcategory.hasMany(models.MenuItem, {
            foreignKey: "subcategoryId",
            as: "menu_items"
        })
    }

    return Subcategory
}
