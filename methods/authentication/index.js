const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const models = require("../../models");
const Promise = require("bluebird");
const { sequelize } = require("../../models");
const key = require("../../config/api.json").API_SECRET;
var Authentication = {};


Authentication.addIncharge = function(info) {
  return new Promise(function(resolve, reject) {
    bcrypt.hash(info.password, saltRounds, function(err, hash) {
      return sequelize
        .transaction(function(t) {

          var people = {};
          people.username = info.username;
          people.faculty_id = info.faculty_id;
          people.privilege = info.privilege;
          people.password = hash;

          return models.users
            .create(people, { transaction: t })
            .then(function(peeps) {
              console.log(peeps);
              resolve({ 
                'success': true,
                'data': peeps });
            })
            .catch(function(err) {
              console.log(err);
              reject({ 
                'success': false,
                'err':err });
            });
        })
        .then(function(result) {
          console.log(result);
          resolve({ 
            'success': true ,
            'data':result});
        })
        .catch(function(err) {
          console.log(err);
          reject({ 
          'success': false,
          'err':err });
        });
    });
  });
};

Authentication.authenticateIncharge = function(info) {
  return new Promise(function(resolve, reject) {
    models.users
      .findOne({
        where: {
          username: info.username
        }
      })
      .then(result => {
        if (result) {
          bcrypt.compare(info.password, result.password, function(err, res) {
            if (res === true) {
              console.log("correct password-bcrypt");
              models.faculty
                .findOne({
                  where: {
                    faculty_id: result.faculty_id
                  }
                })
                .then(success => {
                  const token = jwt.sign(
                    {
                      faculty_id: result.faculty_id,
                      username: success.username
                    },
                    key,
                    { expiresIn: "4h" }
                  );
                  const faculty_id = result.faculty_id;
                  console.log(faculty_id);

                  resolve({
                    'success': true,
                    'token': token,
                    'username': info.username
                  });
                })
                .catch(err => {
                  console.log(err);
                  reject({ 
                    'err': err,
                    'success': false,
                   });
                });
            } 
            else {
              console.log("wrong password-bcrypt");
              reject({ 
                'success': false, 
                'token': null ,
                'message': "Wrong password..!"
              });
            }
          });
        } else {
          reject({
            'err': err,
            'success': false,
            'message': "Invalid username..!"
          });
        }
      })
      .catch(err => {
        console.log(err);
        reject({
          'err': err,
          'success': false,
          'message': "Invalid username..!"
        });
      });
  });
};

module.exports = Authentication;
