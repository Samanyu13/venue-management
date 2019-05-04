module.exports = function (sequelize, DataTypes) {
    const Venue = sequelize
      .define('venue', {
        venue_id: {
          type: DataTypes.INTEGER(),
          primaryKey: true,
          autoIncrement: true,
        },
        venue_name: {
          type: DataTypes.STRING(45),
          allowNull: false,
          unique: 'compositeIndex',
        },
        venue_type: {
          type: DataTypes.STRING(6),
          allowNull: false,
          unique: 'compositeIndex',
        },
        venue_code: {
          type: DataTypes.STRING(6),
          allowNull: false,
          unique: true,
        },
        incharge_id: {
          type: DataTypes.INTEGER(),
          allowNull: true,
          unique: 'compositeIndex',
        },
        // implement [index6 specified in db design] compositeIndex when sequelize
        // supports it.
        // https://github.com/sequelize/sequelize/issues/8148
      });
  
    Venue.associate = function (models) {
      models.venue
        .belongsTo(models.users, {
          onDelete: 'CASCADE',
          foreignKey: {
            name: 'incharge_id',
            // allowNull: false -- already defined
          },
        });
    };
    return Venue;
  };