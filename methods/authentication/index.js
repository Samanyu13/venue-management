const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const models = require("../../models");
const methods = require("../../methods/authentication");
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
          people.name = info.name;
          people.email = info.email;
          people.phone_no = info.phone_no;
          people.department = info.department;

          return models.employees
            .create(people, { transaction: t })
            .then(function(peeps) {
              var login_credentials = {};
              login_credentials.employee_code = info.employee_code;
              login_credentials.password = hash;
              return models.employee_credentials
                .create(login_credentials, {
                  transaction: t
                })
                .then(function(result) {
                  console.log(result);
                  resolve({ success: true });
                })
                .catch(function(err) {
                  console.log(err);
                  reject({ success: false });
                });
            })
            .catch(function(err) {
              console.log(err);
              reject({ success: false });
            });
        })
        .then(function(result) {
          console.log(result);
          resolve({ success: true });
        })
        .catch(function(err) {
          console.log(err);
          reject({ success: false });
        });
    });
  });
};

Authentication.authenticateIncharge = function(info) {
  return new Promise(function(resolve, reject) {
    models.employee_credentials
      .findOne({
        where: {
          employee_code: info.employee_code
        }
      })
      .then(result => {
        if (result) {
          bcrypt.compare(info.password, result.password, function(err, res) {
            if (res === true) {
              console.log("correct password-bcrypt");
              models.employees
                .findOne({
                  where: {
                    employee_code: result.employee_code
                  }
                })
                .then(success => {
                  const token = jwt.sign(
                    {
                      employee_code: result.employee_code,
                      username: success.username
                    },
                    key,
                    { expiresIn: "1h" }
                  );
                  const employee_code = result.employee_code;
                  console.log(employee_code);

                  resolve({
                    success: true,
                    token: token,
                  });
                })
                .catch(err => {
                  console.log(err);
                  reject({ error: err });
                });
            } else {
              console.log("wrong password-bcrypt");

              reject({ success: false, token: null });
            }
          });
        } else {
          reject(new Error());
        }
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

module.exports = Authentication;
