import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
    state = {
        text: ''
    };
    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        users: PropTypes.array.isRequired
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
        const { clearUsers, users } = this.props;
        const deleteBtn = users.length > 0 && <input type="submit" value="Clear" className="btn btn-danger btn-block" onClick={clearUsers}/>
        return (
            <form className="form" onSubmit={this.searchSubmit}>
                <input type="text" name="text" placeholder="Search Users..." value={this.state.text} onChange={this.handleSearch} autoComplete="off"/>
                <input type="submit" value="Search" className={this.state.text !== '' ? "btn btn-primary btn-block" : "btn btn-secondary btn-block"} disabled={this.state.text === ''}/>
                {deleteBtn}
            </form>
        );
    }
}

export default Search;