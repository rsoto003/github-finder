import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import axios from 'axios';
import './App.css';


class App extends Component {
  state = {
    users: [],
    loading: true,
    alert: null
  }
  // async componentDidMount(){
  //   const response = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   this.setState({ 
  //     loading: false,
  //     users: response.data
  //   });
  // }

  searchUsers = async text => {
    this.setState({ loading: true })
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
          process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ loading: false, users: res.data.items})
  }
  clearUsers = () => {
    this.setState({ 
      users: [],
      loading: false
    })
  }
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type} })
    setTimeout( () => this.setState({ alert: null}), 5000)
  }

  closeAlert = () => {
    this.setState({ alert: null })
  }

  
  render(){
    return (
      <div className="App">
        <Navbar />
        <div className="container">
        <Alert alert={this.state.alert} closeAlert={this.closeAlert}/>
        <Search 
          searchUsers={this.searchUsers} 
          clearUsers={this.clearUsers} 
          users={this.state.users} 
          setAlert={this.setAlert}
          />
        <Users users={this.state.users} loading={this.state.loading}/>
        </div>
      </div>
    );
  }
}

export default App;
