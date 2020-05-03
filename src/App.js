import React, { Component, Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import axios from 'axios';
import './App.css';


class App extends Component {
  state = {
    users: [],
    user: {},
    loading: true,
    alert: null,
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

  //get single users
  getUser = async username => {
    this.setState({ loading: true })
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
          process.env.REACT_APP_GITHUB_CLIENT_SECRET}`); 
    this.setState({loading: false, user: res.data})
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
    const { users, user, loading, alert } = this.state;
    return (
      <Router>
         <div className="App">
          <Navbar />
          <div className="container">
          <Alert alert={alert} closeAlert={this.closeAlert}/>
          <Switch>
            <Route exact path="/" render={props => ( 
              <Fragment>
                <Search 
                  searchUsers={this.searchUsers} 
                  clearUsers={this.clearUsers} 
                  users={users} 
                  setAlert={this.setAlert}
                />
                <Users users={users} loading={loading}/>
              </Fragment>
            )} />
            <Route exact path="/about" component={About}/>
            <Route exact path="/user/:login" render={props => (
              <User {...props   } getUser={this.getUser} user={user} loading={loading}/>
            )}/>
          </Switch>

          </div>
        </div>
      </Router>
     
    );
  }
}

export default App;
