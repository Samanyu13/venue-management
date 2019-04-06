function InchargeLogin(){
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var tosend = {};
    tosend.username = username;
    tosend.password = password;
    axios.post('http://localhost:3000/authentication/login',tosend)
    .then(function(result){
        window.location.href = "index.ejs"
    })
    .catch(function(err){
        console.log(err)
    });
}

function InchargeRegister(){
    var username = document.getElementById('username').value;
    var faculty_id = document.getElementById('faculty_id').value;
    var password = document.getElementById('password').value;
    var privilege = document.getElementById('privilege').value;
    var tosend = {};
    tosend.username = username;
    tosend.faculty_id = faculty_id;
    tosend.password = password;
    tosend.privilege = privilege;
    axios.post('http://localhost:3000/authentication/register',tosend)
    .then(function(result){
        window.location.href = "index.ejs";
    })
    .catch(function(err){
        console.log(err)
    });
}