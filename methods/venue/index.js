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

Venue.getVenues_EventsByCode = function(code) {
    return new Promise(function(resolve, reject) {
        models.venue.findOne({
            where: {
                venue_code: code
            }
        })
        .then(ven => {
            console.log(JSON.stringify(ven));
            if(ven == null) {
                resolve({
                    'success': false,
                    'err':"Not_found"
                });
            }
            else {
                if(ven.incharge_id != null) {
                    models.users.findOne({
                        where: {
                            user_id: ven.incharge_id
                        }
                    })
                    .then(user => {
                        console.log(JSON.stringify(user));
                        models.faculty.findOne({
                            where: {
                                faculty_id: user.faculty_id
                            }
                        })
                        .then(fac => {
                            var data = {};
                            data.venue_code = ven.venue_code;
                            data.venue_name = ven.venue_name;
                            data.venue_type = ven.venue_type;
                            data.name = fac.name;
                            dataphone_no = fac.phone_no;
                            resolve({
                                'success': true,
                                'data': data
                            });
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    })
                    .catch(err => {
                        console.log(err)
                    });
                }
                else {
                    var data = {};
                    data.venue_code = ven.venue_code;
                    data.venue_name = ven.venue_name;
                    data.venue_type = ven.venue_type;
                    data.name = "Nil";
                    data.phone_no = "-";
                    resolve({
                        'success': true,
                        'data': data
                    });
                }
            }
        })
        .catch(err => {
            console.log(err)
        });
    });
};

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