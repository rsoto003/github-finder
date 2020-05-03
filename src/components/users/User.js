import React, { Component } from 'react';
import Spinner from '../layout/Spinner';

class User extends Component {
    componentDidMount(){
        this.props.getUser(this.props.match.params.login)
    }
    render(){
        const { 
            name, 
            avatar_url, 
            location, 
            bio, 
            blog, 
            login, 
            html_url, 
            followers, 
            following, 
            public_repos, 
            public_gists, 
            hireable 
    } = this.props.user;
    const { loading } = this.props
        if( loading ){
            return <Spinner />
        } else {
            return (
                <div>
                    <img src={avatar_url} className="round-img" style={{ width: '130px'}}/>
                    <h3>{name}</h3>
                    <h2>{location}</h2>
                    <div>{hireable}</div>
                    <h3>{bio}</h3>
                    <a href={blog}>Personal Links</a>
                </div>
            )
        }
    }
}

export default User;