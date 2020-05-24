import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';

const Search = ({ clearUsers, users, setAlert }) => {
    const githubContext = useContext(GithubContext);

   const [ text, setText ] = useState('')

    const handleSearch = event => setText(event.target.value); 

    const searchSubmit = event => {
        event.preventDefault();

        if(text === ''){
            setAlert('Please enter something', 'danger')
        } else {
            githubContext.searchUsers(text);
            setText('')
        }
    };

        const deleteBtn = users.length > 0 && <input type="submit" value="Clear" className="btn btn-danger btn-block" onClick={clearUsers}/>

        return (
            <form className="form" onSubmit={searchSubmit}>
                <input 
                    type="text" 
                    name="text" 
                    placeholder="Search Users..." 
                    value={text} 
                    onChange={handleSearch} 
                    autoComplete="off"
                />
                <input 
                    type="submit" 
                    value="Search" 
                    className={text !== '' ? "btn btn-primary btn-block" : "btn btn-secondary btn-block"}        
                />
                {deleteBtn}
            </form>
        );
}

Search.propTypes = {
    clearUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    setAlert: PropTypes.func.isRequired
   }

export default Search;