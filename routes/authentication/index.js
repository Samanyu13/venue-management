const express = require("express");
const router = express.Router();
const methods = require("../../methods");

router.get('/login', function(req, res, next) {
  res.render('authentication/login', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('authentication/register', { title: 'Express' });
});

router.post("/register", function(req, res) {
  let tosend = {};
  tosend.username = req.body.username;
  tosend.faculty_id = req.body.faculty_id;
  tosend.password = req.body.password;
  tosend.privilege = req.body.privilege;

  methods.Authentication.addIncharge(tosend)
    .then(function(result) {
      console.log("Registration started result:"+result);
        return res.json({
          'success': true,
          'data': result.data
        })
    })
    .catch(function(err) {
      var obj = JSON.stringify(err);
      console.log(obj);
      return res.json({
        'success': false,
        'err': err.err.errors[0].message
      });
    });
});

router.post("/login", function(req, res) {

    let info = {};
    console.log(req.body);
    info.username = req.body.username;
    info.password = req.body.password;
    methods.Authentication
    .authenticateIncharge(info)
    .then(function(result) {
      console.log(result.success);
      if (result.success === true) {
        console.log("received token ");
        return res.json({
          'success': true,
          jwt:result.token
        });
      } 
    })
    .catch(function(err) {
      console.log(err);
      return res.json({
        'success': false,
        'err':err.message
      });
    });
});


module.exports = router;