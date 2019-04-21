module.exports = function (sequelize, DataTypes) {
    const Event = sequelize
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
        coordinator_phone: {
          type: DataTypes.STRING(13),
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
        end_time: {
            type: DataTypes.TIME(),
            allowNull: true,
            unique: 'compositeIndex',
        },
        venue_id: {
          type: DataTypes.INTEGER(),
          allowNull: true,
          unique: 'compositeIndex',
      },
        // implement [index6 specified in db design] compositeIndex when sequelize
        // supports it.
        // https://github.com/sequelize/sequelize/issues/8148
      });
  
      Event.associate = function (models) {
        models.event
        .belongsTo(models.venue, {
            onDelete: 'CASCADE',
            foreignKey: {
              name: 'venue_id',
              // allowNull: false -- already defined
            },
        });
      };  
    return Event;
  };