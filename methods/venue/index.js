const models = require("../../models");
const Promise = require("bluebird");
// const { sequelize } = require("../../models");

var Venue = {};

Venue.getVenueByCode = function(info) {
    return new Promise(function(resolve, reject) {
        models.venue.findAndCountAll({
            where: {
                venue_code: info
            }
        })
        .then(result => {
            resolve ({
                'success': true,
                'count': result.count,
                'data': result.rows
            });
        })
        .catch(err => {
            reject({
                'success': false,
                'message': 'Error..!'
            })
        });
    })
}

Venue.updateVenueByCode = function(info,data) {
    return new Promise(function(resolve, reject) {
        models.venue.update(data,{
            where:{
                venue_code: info
            }
        })
        .then((updated) => {
            resolve({
                'success': true,
                'data': updated
            });
        })
        .catch((err) => {
            resolve({
                'success': false,
                'message': 'Updation unsuccessful'
            });          
        })
    })
}

module.exports = Venue;