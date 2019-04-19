const models = require("../../models");
const Promise = require("bluebird");
const { sequelize } = require("../../models");

var Incharge = {};

Incharge.getUserDetails = function(info) {
    let details = {};
    return new Promise(function(resolve, reject) {
        models.users
        .findOne({
            where: {
                username: info
            }
        })
        .then((result) => {
            models.faculty
            .findOne({
                where: {
                    faculty_id: result.faculty_id
                }
            })
            .then((fac) => {
                models.venue
                .findOne({
                    where: {
                        incharge_id: result.user_id
                    }
                })
                .then((ven) => {
                    details.username = result.username;
                    details.privilege = result.privilege;
                    details.venue = ven.venue_name;
                    details.venue_type = ven.venue_type;
                    details.venue_dept = ven.venue_dept;
                    details.phone_no = fac.phone_no;
                    resolve({
                        'success': true,
                        'details': details,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    reject({
                        'success': false,
                        'err': err
                    });
                });
            })
            .catch((err) => {
                console.log(err);
                reject({
                    'success': false,
                    'err': err
                });
            });
        })
        .catch((err) => {
            console.log(err);
            reject({
                'success': false,
                'err': err
            });
        })
    })
}

module.exports = Incharge;