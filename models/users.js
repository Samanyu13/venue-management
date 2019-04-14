module.exports = function (sequelize, DataTypes) {
    const Users = sequelize
      .define('users', {
        user_id: {
          type: DataTypes.INTEGER(),
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: true,
        },
        privilege: {
          type: DataTypes.STRING(2),
          allowNull: false,
          unique: 'compositeIndex',
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: 'compositeIndex',
        },
        faculty_id: {
          type: DataTypes.INTEGER(),
          allowNull: true,
          unique: true,
        },
        // implement [index6 specified in db design] compositeIndex when sequelize
        // supports it.
        // https://github.com/sequelize/sequelize/issues/8148
      });
  
    Users.associate = function (models) {
      models.users
        .belongsTo(models.faculty, {
          onDelete: 'CASCADE',
          foreignKey: {
            name: 'faculty_id',
            // allowNull: false -- already defined
          },
        });
    };
  
    return Users;
  };