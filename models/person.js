const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('person', {
    id_user: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'person',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_id_user",
        unique: true,
        fields: [
          { name: "id_user" },
        ]
      },
    ]
  });
};
