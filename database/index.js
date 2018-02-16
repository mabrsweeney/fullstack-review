const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: Number, reponame: String, username: String, description: String, url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  for(var i in repos){
    var mod = new Repo({id:repos[i].id, reponame:repos[i].name, 
      username:repos[i].owner.login, description:repos[i].description, url:repos[i].html_url });
    mod.save();
  }
}
let getRepos = function(callback){
  Repo.find().sort({reponame:1}).limit(25).exec(function(err, repos){
    if (err) throw err;
    callback({repos:repos});
  })
}

module.exports.save = save;
module.exports.getRepos = getRepos;