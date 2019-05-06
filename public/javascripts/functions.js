function dropDown(url, field, attr, Id) {
  var temp = localStorage.getItem('user_details');
  var x = JSON.parse(temp);
    axios.get(url+`/${x.venue_id}`, {
      withCredentials: true
    })
    .then(function (result) {
      var data = result.data;
      console.log(data[0][attr])
      var text = '<option value="" disabled selected>' + field + '</option>';
      for (var i = 0; i < data.length; i++) {
        if (data[i][attr] != undefined) {
          text += "<option>" + data[i][attr] + "</option>";
        }
      }
      var resultElement = document.getElementById(Id);
      resultElement.innerHTML = text;
    }).catch(function (err) {
      console.log(err);
    });
  }

function logOut(){
  localStorage.removeItem("user_details");
}

function formatDate(date) {
  d = new Date(date);

  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
  console.log(d)
  var day = d.getDate();
  var monthIndex = d.getMonth();
  var year = d.getFullYear();
  console.log(day + " " + monthIndex + " " + year)
  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

function getEvents() {
  var temp = localStorage.getItem('user_details');
  var x = JSON.parse(temp);
  axios.get(`http://localhost:3000/private/events/getEventsByID/${x.venue_id}`, {
    withCredentials: true
  })
  .then(function (result) {
    var data = result.data.data;
    var text = "<table><tr><th>Event ID</th><th>Event Name</th><th>Coordinator</th><th>Coordinator Contact</th><th>Date</th><th>Start Time</th><th>End Time</th></tr>";
    for (var i = 0; i < data.length; i++) {
      text += "<tr><td>" + data[i].event_id + "</td><td>" + data[i].event_name + "</td><td>" + data[i].coordinator + "</td><td>" + data[i].coordinator_phone + "</td><td>" + 
      formatDate(data[i].date) + "</td><td>" + data[i].start_time + "</td><td>" + data[i].end_time + "</td></tr>";
    }
    text += "</table>";
    var resultElement = document.getElementById('display_it');
    resultElement.innerHTML = text;
  })
  .catch(function (err) {
    console.log(err)
  });
}