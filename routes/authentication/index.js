const express = require("express");
const router = express.Router();
const methods = require("../../methods");

//get login page
router.get('/login', function(req, res, next) {
  if(req.session.token) {

    if(req.session.privilege == "X") {
      res.redirect('/private/admin/dashboard');
    }
    else if(req.session.privilege == "Z")
    res.redirect('/private/incharge/dashboard')
  }
  res.render('authentication/login', { title: 'Express' });
});

//get register page 
router.get('/register', function(req, res, next) {
  res.render('authentication/register', { title: 'Express' });
});

//logout
router.get("/logout", function(req,res){
  req.session.destroy(function(){
    console.log("User logged out")
    res.redirect('/')
  })
})

//process register data
router.post("/register", function(req, res) {
  let tosend = {};
  let x = {};
  tosend.username = req.body.username;
  tosend.faculty_id = req.body.faculty_id;
  tosend.password = req.body.password;
  tosend.privilege = req.body.privilege;
  code = req.body.venue_code;

  methods.Venue.getVenueByCode(code)
  .then((venue) => {
    if(venue.count <= 0) {
      return res.json({
        'success': false,
        'err': 'No such venue found..!'
      })
    }
    else {

      x.user_id = venue.data[0].user_id;
      x.venue_name = venue.data[0].venue_name;  
      x.venue_type = venue.data[0].venue_type;
      x.venue_code = venue.data[0].venue_code;
      // x.incharge_id = data[0].incharge_id;

      methods.Authentication.addIncharge(tosend)
      .then(function(result) {
        var code = x.venue_code;
        x.incharge_id = result.data.user_id; 

        methods.Venue.updateVenueByCode(code, x)
        .then((updated) => {
          console.log("Registration started result:"+result);
          return res.json({
            'success': true,
            'data': result.data
          });          
        })
        .catch((err) => {
          return res.json({
            'success': false,
            'err': err
          });
        });
      })
      .catch(function(err) {
        var obj = JSON.stringify(err);
        console.log(obj);
        return res.json({
          'success': false,
          'err': err.err.errors[0].message
        });
      }); 
    }     
  })
  .catch(function(err) {
    return res.json({
      'success': false,
      'err': err.message
    });
  }); 
});

//process login data
router.post("/login",function(req, res) {
    
    let info = {};
    console.log(req.body);
    info.username = req.body.username;
    info.password = req.body.password;
    methods.Authentication
    .authenticateIncharge(info)
    .then(function(result) {
      console.log(result);
      if (result.success === true) {
        console.log("received token ");
        req.session.token=result.token;
        req.session.privilege = result.privilege;
        methods.Incharge.getUserDetails(info.username)
        .then(function(data){
          return res.json({
            'success': true,
            'data': data.details,
            'privilege': result.privilege
          });
        })
        .catch(function(err){
          console.log(err);
          return res.json({
           'success': false,
           'err':err.message
           });
        })
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