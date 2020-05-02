import React from 'react';
import PropTypes from 'prop-types';
import { Link }  from 'react-router-dom';

const UserItem = ({user: { avatar_url, login }}) => {
    return (
        <div className="card text-center bg-light">
            <img 
                src={avatar_url} 
                alt="" 
                className="round-img"
                style={{ width: '60px'}}
            />
            <h3>{login}</h3>
            <div>
                <Link className="btn btn-info btn-sm my-1" to={`/user/${login}`}>
                More
                </Link>
            </div>
        </div>
    );
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
}

export default UserItem;