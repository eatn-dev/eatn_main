module.exports = (sequelize, DataTypes) => {
    const MenuItem = sequelize.define("MenuItem", {
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
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(6, 2),
            allowNull: false,
            validate: {
                min: 0.01
            }
        },
        quantity: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        underscored: true,
        tableName: "menu_items"
    })
    
    MenuItem.associate = (models) => {
        MenuItem.belongsToMany(models.Tag, {
            through: "menu_item_tags",
            as: "tags"
        })
        
        MenuItem.belongsTo(models.Subcategory, {
            foreignKey:"subcategoryId",
            as: "subcategory"
        })
    }

    return MenuItem
}

