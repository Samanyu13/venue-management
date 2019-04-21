const models = require("../../models");
const Promise = require("bluebird");
const { sequelize } = require("../../models");

var Calendar = {};

Calendar.loadAllEvents = function() {
    return new Promise(function(resolve, reject) {
        let x = [];
        models.event.findAll()
        .then((events) => {
            for(let i = 0; i < events.length; i++) {
                var obj = {};
                obj.id = events[i].event_id,
                obj.title = events[i].event_name,
                obj.start = events[i].date
                x.push(obj);                
            }
            resolve({
                success: true,
                list: x
            })
        })
        .catch((err) => {
            console.log(err);
            reject({
                success: false,
                err: err
            });
        });
    })
}

Calendar.loadUserEvents = function(info) {
    return new Promise(function(resolve, reject) {
        let x = [];
        models.event.findAll({
            where: {
                venue_id: info
            }
        })
        .then((events) => {
            for(let i = 0; i < events.length; i++) {
                var obj = {};
                obj.id = events[i].event_id,
                obj.title = events[i].event_name,
                obj.start = events[i].date
                x.push(obj);                
            }
            resolve({
                success: true,
                list: x
            })
        })
        .catch((err) => {
            console.log(err);
            reject({
                success: false,
                err: err
            });
        });
    })
}

module.exports = Calendar;
