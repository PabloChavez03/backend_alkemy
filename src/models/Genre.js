const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Genre', {
    name: {
      type: DataTypes.STRING(),
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(),
      allowNull: true
    }
  },
  {
    timestamps: false
  })
}