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

module.exports = Events;