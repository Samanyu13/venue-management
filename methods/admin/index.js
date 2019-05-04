const models = require("../../models");
const Promise = require("bluebird");

var Admin = {};

Admin.removeIncharge = function(info) {
    return new Promise(function(resolve, reject) {
        models.users.destroy({
            where: {
                username: info
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

module.exports = Admin;