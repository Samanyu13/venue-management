function InchargeLogin(){
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var tosend = {};
    tosend.username = username;
    tosend.password = password;
    axios.post('http://localhost:3000/authentication/login',tosend)
    .then(function(result) {
        if(result.data.success==true) {
            console.log(result.data.data)
            if(result.data.data.privilege == "X") {
                window.location.href = "/private/admin/dashboard";
            }
            else if(result.data.data.privilege == "Z") {
                window.location.href = "/private/incharge/dashboard";
            }
            localStorage.setItem('user_details', JSON.stringify(result.data.data)); 
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

function InchargeRegister() {
    var username = document.getElementById('username').value;
    var faculty_id = document.getElementById('faculty_id').value;
    var password = document.getElementById('password').value;
    var privilege = document.getElementById('privilege').value;
    var venue_code = document.getElementById('venue_code').value;
    var tosend = {};
    tosend.username = username;
    tosend.faculty_id = faculty_id;
    tosend.password = password;
    tosend.privilege = privilege;
    tosend.venue_code = venue_code;
    axios.post('http://localhost:3000/authentication/register', tosend)
    .then(function(result) {
        if(result.data.success == true) {
            console.log(result.data.data);
            window.location.href = "../../../";
        }
        else{
            console.log(result.data.err);
            document.getElementById('formError').innerHTML=result.data.err;
        }
    })
    .catch(function(err){
        console.log(err)
    });
}

function AddEvent() {
    var temp = localStorage.getItem('user_details');
    var val = JSON.parse(temp);

    var event_name = document.getElementById('event_name').value;
    var coordinator = document.getElementById('coordinator').value;
    var date = document.getElementById('date').value;
    var coordinator_phone = document.getElementById('coordinator_phone').value;
    var start_time = document.getElementById('start_time').value;
    var end_time = document.getElementById('end_time').value;
    var tosend = {};
    tosend.event_name = event_name;
    tosend.coordinator_phone = coordinator_phone;
    tosend.coordinator = coordinator;
    tosend.date = date;
    tosend.start_time = start_time;
    tosend.end_time = end_time;
    tosend.venue_id = val.venue_id;

    axios.post('http://localhost:3000/private/events/add_event',tosend)
    .then(function(result) {
        window.location.href = "/private/incharge/dashboard";
    })
    .catch(function(err) {
        console.log(err);
    });
}

function removeIncharge() {
    var username = document.getElementById('username').value;
    var tosend = {};
    tosend.username = username;

    axios.post('http://localhost:3000/private/admin/incharge/removeIncharge', tosend)
    .then(function(result) {
        window.location.href = "/private/admin/dashboard";
    })
    .catch(err => {
        console.log(err);
    });
}

function removeVenue() {
    var venue_code = document.getElementById('venue_code').value;
    var tosend = {};
    tosend.venue_code = venue_code;

    axios.post('http://localhost:3000/private/admin/venue/removeVenue', tosend)
    .then(function(result) {
        window.location.href = "/private/admin/dashboard";
    })
    .catch(err => {
        console.log(err);
    });
}

function addVenue() {
    var venue_name = document.getElementById('venue_name').value;
    var venue_type = document.getElementById('venue_type').value;
    var venue_code = document.getElementById('venue_code').value;
    if(document.getElementById('incharge_id').value != null ) {
        var incharge_id = document.getElementById('incharge_id').value;
    }
    else {
        incharge_id = null;
    }

    var tosend = {};
    tosend.venue_name = venue_name;
    tosend.venue_type = venue_type;
    tosend.venue_code = venue_code;
    tosend.incharge_id = incharge_id;


    axios.post('http://localhost:3000/private/admin/venue/addVenue', tosend)
    .then(function(result) {
        window.location.href = "/private/admin/dashboard";
    })
    .catch(function(err) {
        console.log(err);
    });
}

function deleteEvent() {
    var venue_id = document.getElementById('event_id').value;

    var tosend = {};
    tosend.venue_id = venue_id;

    axios.post('http://localhost:3000/private/events/delete_event', tosend)
    .then(result => {
        window.location.href = "/private/incharge/dashboard";
    })
    .catch(err => {
        console.log(err);
    })
}