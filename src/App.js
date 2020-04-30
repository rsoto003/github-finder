import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import './App.css';


class App extends Component {
  state = {
    users: [],
    loading: true
  }
  async componentDidMount(){
    const response = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ 
      loading: false,
      users: response.data
    });
  }

  render(){
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Users users={this.state.users} loading={this.state.loading}/>
        </div>
      </div>
    );
  }
}

export default App;
