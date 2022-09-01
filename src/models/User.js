const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Operation', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    password: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(),
      allowNull: false
    }
  },
  {
    timestamps: false
  })
}