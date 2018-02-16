const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  let options = {
    url: 'https://api.github.com/users/'+username+'/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  request.get(options).on('response', function(response) {
    var getData = []
    response.on('data', (data) => {
      getData.push(data);
    }).on('end', () => {
      callback(JSON.parse(getData.join('')));
    })
  })
}

module.exports.getReposByUsername = getReposByUsername;