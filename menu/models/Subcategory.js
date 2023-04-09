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
            allowNull: false
        }
    }, {
        underscored: true,
        tableName: "subcategories"
    })

    Subcategory.associate = (models) => {
        Subcategory.belongsTo(models.Category, {
            foreignKey: "category_id"
        })

        Subcategory.hasMany(models.MenuItem, {
            foreignKey: "subcategory_id"
        })
    }

    return Subcategory
}
