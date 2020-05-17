import React, { useState, Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import axios from 'axios';
import './App.css';


const App = () => {
  const [ users, setUsers ] = useState([]);
  const [ repos, setRepos ] = useState([]);
  const [ user, setUser ] = useState({});
  const [ loading, setLoading ] = useState(false);
  const [ alert, setAlertMsg ] = useState(null);

  const searchUsers = async text => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
          process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUsers(res.data.items);
    setLoading(false);
  }

  //get single users
  const getUser = async username => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
          process.env.REACT_APP_GITHUB_CLIENT_SECRET}`); 
 
    setUser(res.data);
    setLoading(false);
  }

  //get repos
  const getUserRepos = async username => {
    setLoading(true);
    
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
          process.env.REACT_APP_GITHUB_CLIENT_SECRET}`); 

    setRepos(res.data);
    setLoading(false);
  }


  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  }

  const setAlert = (msg, type) => {
    setAlertMsg({ msg, type});
    setTimeout( () => setAlertMsg(null), 5000);
  }

  const closeAlert = () => {
    setAlert(null);
  }

  
    return (
      <Router>
         <div className="App">
          <Navbar />
          <div className="container">
          <Alert alert={alert} closeAlert={closeAlert}/>
          <Switch>
            <Route exact path="/" render={props => ( 
              <Fragment>
                <Search 
                  searchUsers={searchUsers} 
                  clearUsers={clearUsers} 
                  users={users} 
                  setAlert={setAlert}
                />
                <Users users={users} loading={loading}/>
              </Fragment>
            )} />
            <Route exact path="/about" component={About}/>
            <Route exact path="/user/:login" render={props => (
              <User 
                {...props   } 
                getUser={getUser} 
                user={user} 
                loading={loading}                   
                getUserRepos={getUserRepos}
                repos={repos}        
                />
            )}/>
          </Switch>

          </div>
        </div>
      </Router>
     
    );
}

export default App;
