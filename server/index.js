const githubHelper = require('../helpers/github.js');
const mongo = require('../database/index.js');
const express = require('express');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repo', function (req, res) {
  var postData = [];
  req.on('data', (data) => {
    postData.push(data);
  }).on('end', () => {
    postData = postData.join('');
    githubHelper.getReposByUsername(postData, function(repos) {
      mongo.save(repos)
    });
  })
});

app.get('/repos', function (req, res) {
  res.set('access-control-allow-origin', '*')
  mongo.getRepos((repos) => {
    res.send(repos);
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

