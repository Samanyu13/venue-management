module.exports = function (sequelize, DataTypes) {
    const Incharge = sequelize
      .define('incharge', {
        incharge_id: {
          type: DataTypes.INTEGER(),
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: 'compositeIndex',
        },
        // implement [index6 specified in db design] compositeIndex when sequelize
        // supports it.
        // https://github.com/sequelize/sequelize/issues/8148
      });
  
    Incharge.associate = function (models) {
      models.users
        .belongsTo(models.faculty, {
          onDelete: 'CASCADE',
          foreignKey: {
            name: 'faculty_id',
            // allowNull: false -- already defined
          },
        });
    };
  
    return Incharge;
  };