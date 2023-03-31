/* eslint-disable camelcase */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // menu item
        await queryInterface.createTable("menu_items", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: false
            },
            description:{
                type: Sequelize.DataTypes.TEXT,
                allowNull: false
            },
            price: {
                type: Sequelize.DataTypes.DECIMAL(6, 2),
                allowNull: false,
                validate: {
                    min: 0.01
                }
            },
            quantity: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: false
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })

        // tag
        await queryInterface.createTable("tags", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: false
            },
            bgColor: {
                type: Sequelize.DataTypes.STRING(7),
                allowNull: false,
                validate: {
                    is: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
                }
            },
            fgColor: {
                type: Sequelize.DataTypes.STRING(7),
                allowNull: false,
                validate: {
                    is: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
                }
            },
            icon: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: true
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })

        // item and tag association table
        await queryInterface.createTable("menu_item_tag", {
            menuitem_id : {
                primaryKey: true,
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "MenuItem",
                    key: "id"
                }
            },
            tag_id: {
                primaryKey: true,
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Tag",
                    key: "id"
                }
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },

    // eslint-disable-next-line no-unused-vars
    async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
        await queryInterface.dropTable("menu_items")
        await queryInterface.dropTable("tags")
        await queryInterface.dropTable("menu_item_tag")
    }
}
