function dropDown(url, field, attr, id) {
    axios.get(url, {
      withCredentials: true
    }).then(function (result) {
      var text = '<option value="" disabled selected>' + field + '</option>';
      var data = result.data.classes;
      for (var i = 0; i < data.length; i++) {
        if (data[i][attr] != undefined) {
          text += "<option>" + data[i][attr] + "</option>";
        }
      }
      var resultElement = document.getElementById(id)
      resultElement.innerHTML = text
    }).catch(function (err) {
      console.log(err);
    });
  }