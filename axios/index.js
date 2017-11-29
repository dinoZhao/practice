const axios = require('axios');
//console.log(axios)
axios.get('./data.json')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });