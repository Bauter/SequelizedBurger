  
module.exports = function(sequelize, DataTypes) {
    let customer = sequelize.define("customer", {
      
      customer_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      eaten: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
      
    },
    {
      timestamps: false
    });

    // customer.associate = function(models) {
        
    //     customer.hasMany(models.burger, {
          
    //     });
    //   };
  
     return customer;
  
  };