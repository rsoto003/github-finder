import React, { Component } from 'react';

class Search extends Component {
    state = {
        text: ''
    }
    handleSearch = event => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        })
    }

    searchSubmit = event => {
        event.preventDefault();
        this.props.searchUsers(this.state.text);
        this.setState({text: ''})
    }

    render(){
        return  (
            <form className="form" onSubmit={this.searchSubmit}>
                <input type="text" name="text" placeholder="Search Users..." value={this.state.text} onChange={this.handleSearch} autoComplete="off"/>
                <input type="submit" value="Search" className="btn btn-dark btn-block"/>
            </form>
        );
    }
}

export default Search;