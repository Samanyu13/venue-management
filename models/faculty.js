module.exports = function (sequelize, DataTypes) {
    const Faculty = sequelize
      .define('faculty', {
        faculty_id: {
          type: DataTypes.INTEGER(),
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: 'compositeIndex',
        },
        phone_no: {
          type: DataTypes.STRING(14),
          allowNull: false,
          unique: 'compositeIndex',
        },
        department: {
          type: DataTypes.STRING(40),
          allowNull: false,
          unique: 'compositeIndex',
        },
        // implement [index6 specified in db design] compositeIndex when sequelize
        // supports it.
        // https://github.com/sequelize/sequelize/issues/8148
      });
  
    return Faculty;
  };