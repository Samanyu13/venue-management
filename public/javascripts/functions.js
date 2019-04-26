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