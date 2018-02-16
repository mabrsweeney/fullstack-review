import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    { props.repos.map((repo, index) => {
      return <div key={index} className="repo">
        <h2><a href={repo.url}>{repo.reponame}</a></h2>
        <p>{'ID: '+repo.id}</p>
        <p>{'User: '+repo.username}</p>
        <p>{'Description: '+repo.description}</p>
      </div>
    })}
  </div>
)

export default RepoList;