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
    },
    // burgerId: {                                          // Trouble with association  
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'customer',
    //     key: 'id'
    //   }
    // }
  },
  {
    timestamps: false
  });

  // ASSOCIATE burger with table 'customer'

  // burger.associate = function(models) {
        
  //   burger.belongsTo(models.customer, { foreignKey: {allowNull: false}}
      
  //   );
  // };

  return burger;

};