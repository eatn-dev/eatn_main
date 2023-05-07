module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define("Tag", {
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
        bgColor: {
            type: DataTypes.STRING(7),
            allowNull: false,
            validate: {
                is: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
            }
        },
        fgColor: {
            type: DataTypes.STRING(7),
            allowNull: false,
            validate: {
                is: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
            }
        },
        icon: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    }, {
        underscored: true,
        tableName: "tags",
    })
    
    Tag.associate = (models) => {
        Tag.belongsToMany(models.MenuItem, {
            through: "menu_item_tags",
            as: "menu_items"
        })
    }

    return Tag
}
