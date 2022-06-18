// Catfacts Model
export default (sequelize, DataTypes) => {
    const Catfacts = sequelize.define('catfacts', {
        // Model attributes are defined here
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        user: {
            type: DataTypes.STRING
        },
        text: {
            type: DataTypes.TEXT
        },
        source: {
            type: DataTypes.STRING
        },
        updatedAt: {
            type: DataTypes.DATE
        },
        type: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        used: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })
    return Catfacts;
}