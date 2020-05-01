import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
    state = {
        text: ''
    };
    static propTypes = {
        searchUsers: PropTypes.func.isRequired
    }

    handleSearch = event => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        })
    };

    searchSubmit = event => {
        event.preventDefault();
        this.props.searchUsers(this.state.text);
        this.setState({text: ''})
    };

    render(){
        const deleteBtn = this.props.users.length > 0 && <input type="submit" value="Clear" className="btn btn-danger btn-block" onClick={this.props.clearUsers}/>
        return  (
            <form className="form" onSubmit={this.searchSubmit}>
                <input type="text" name="text" placeholder="Search Users..." value={this.state.text} onChange={this.handleSearch} autoComplete="off"/>
                <input type="submit" value="Search" className="btn btn-dark btn-block"/>
                {deleteBtn}
            </form>
        );
    }
}

export default Search;