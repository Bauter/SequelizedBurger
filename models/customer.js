  
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
      },
      // customerId: {                                          // Trouble with association  
      //   type: DataTypes.INTEGER,
      //   references: {
      //   model: 'burger',
      //   key: 'id'
      // }
      // }
      
    },
    {
      timestamps: false
    });

    // ASSOCIATE customer with table 'burger'

    // customer.associate = function(models) {
        
    //     customer.hasMany(models.burger, { foreignKey: 'burgerId'}
          
    //     );
    //   };
  
     return customer;
  
  };