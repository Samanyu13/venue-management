module.exports = function (sequelize, DataTypes) {
    const Users = sequelize
      .define('event', {
        event_id: {
          type: DataTypes.INTEGER(),
          primaryKey: true,
          autoIncrement: true,
        },
        event_name: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: 'compositeIndex',
        },
        coordinator: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: 'compositeIndex',
        },
        designation: {
          type: DataTypes.STRING(5),
          allowNull: false,
          unique: 'compositeIndex',
        },
        date: {
          type: DataTypes.DATE(),
          allowNull: true,
          unique: 'compositeIndex',
        },
        start_time: {
            type: DataTypes.TIME(),
            allowNull: true,
            unique: 'compositeIndex',
        },
        start_time: {
            type: DataTypes.TIME(),
            allowNull: true,
            unique: 'compositeIndex',
        },
        // implement [index6 specified in db design] compositeIndex when sequelize
        // supports it.
        // https://github.com/sequelize/sequelize/issues/8148
      });
  
    return Library;
  };