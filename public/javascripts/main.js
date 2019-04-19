function InchargeLogin(){
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var tosend = {};
    tosend.username = username;
    tosend.password = password;
    axios.post('http://localhost:3000/authentication/login',tosend)
    .then(function(result) {
        if(result.data.success==true) {
            let name = result.data.username;
            axios.get(`http://localhost:3000/private/incharge/getInchargeDetails/${name}`, {
                withCredentials: true
            })
            .then((details) => {
                sessionStorage.setItem('user_details', JSON.stringify(details.data.details));            
                window.location.href = "/private/incharge/dashboard";
            })
            .catch((err) => {
                console.log(err);
            });
        }
        else {
            console.log(result.data.err);
            document.getElementById('formError').innerHTML=result.data.err;
        }
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
    .then(function(result) {
        if(result.data.success == true) {
            console.log(result.data.data);
        }
        else{
            console.log(result.data.err);
            document.getElementById('formError').innerHTML=result.data.err;
        }
        // window.location.href = "../";
    })
    .catch(function(err){
        console.log(err)
    });
}