const models = require("../../models");
const Promise = require("bluebird");

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

Venue.removeVenue = function(info) {
    return new Promise(function(resolve, reject) {
        models.venue.destroy({
            where: {
                venue_code: info
            }
        })
        .then((deleted) => {
            if(deleted === 0) {
                reject(new Error());
            }
            else {
                resolve({
                    'success': true,
                    'data': deleted
                });
            }
        })
        .catch((err) => {
            reject({
                'success': false,
                'message': "Error"
            });
        });
    });
};

Venue.addVenue = function(info) {
    return new Promise(function(resolve, reject) {
        models.venue.create(info)
        .then(model => {
            resolve({
                'success': true,
                'data': model
            });
        })
        .catch(err => {
            reject({
                'success': false,
                'err': err
            });        
        });
    });
};

module.exports = Venue;