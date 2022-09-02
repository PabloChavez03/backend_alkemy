const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Character', {
    name: {
      type: DataTypes.STRING(),
      allowNull: false,
      unique: true
    },
    year: {
      type: DataTypes.INTEGER(),
      allowNull: true
    },
    weight: {
      type: DataTypes.FLOAT(),
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(),
      allowNull: true
    },
    history: {
      type: DataTypes.TEXT(),
      allowNull: true
    }
  },
  {
    timestamps: false
  })
}