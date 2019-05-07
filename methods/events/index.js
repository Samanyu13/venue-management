const models = require("../../models");
const Promise = require("bluebird");

var Events = {};

Events.getEventsByID = function(info) {
    return new Promise(function(resolve, reject) {
        models.event.findAll({
            where: {
                venue_id: info
            }
        })
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

Events.deleteEvent = function(info) {
    return new Promise(function(resolve, reject) {
        models.event.destroy({
            where: {
                event_id: info
            }
        })
        .then(model => {
            console.log(model);
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

module.exports = Events;