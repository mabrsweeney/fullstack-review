import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  componentDidMount(){
    this.getRepo();
  }

  getRepo(){
    $.ajax({
      method:'GET',
      url:'http://localhost:1128/repos',
      success: (data) => {
        this.setState({repos:data.repos});
      }
    })
  }

  search (term) {
    console.log(`${term} was searched`);
    if(term !== ''){
      $.ajax({
        method:'POST',
        url: 'http://localhost:1128/repos',
        data: term,
        success: function() {
          this.getRepo();
        }
      })
    }
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));