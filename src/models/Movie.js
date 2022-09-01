const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Movie', {
    title: {
      type: DataTypes.STRING(),
      allowNull: false
    },
    day_to_create: {
      type: DataTypes.DATE(),
      allowNull: true
    },
    rate: {
      type: DataTypes.FLOAT(),
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