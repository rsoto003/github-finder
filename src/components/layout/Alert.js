import React from 'react';

const Alert = ({ alert, closeAlert }) => {
    return (
        alert !== null && (
            <div className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle"></i> {alert.msg}
                <i className="fa fa-window-close right-align" onClick={closeAlert}></i>
            </div>
        )
    )
}

export default Alert;