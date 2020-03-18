//==================================================
//          New Burger Modal 
//==================================================

  
module.exports = function(sequelize, DataTypes) {
  let burger = sequelize.define("burger", {
    
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
    
  },
  {
    timestamps: false
  });

  return burger;

};