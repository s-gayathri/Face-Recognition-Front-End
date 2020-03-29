import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if(isSignedIn === true) {
        return(
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p
                    onClick={() => onRouteChange('signout')}
                    className="f3 link dim black underline pa3 pointer">Sign Out</p>
            </nav>
        );
        } else {
            return (
                    <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <p
                            onClick={() => onRouteChange('signin')}
                            className="f3 link dim black underline pa3 pointer">Sign In</p>
                        <p
                            onClick={() => onRouteChange('register')}
                            className="f3 link dim black underline pa3 pointer">Register</p>
                    </nav>
            );
        }
}

export default Navigation;

//we use arrow functions here for on click because
//if we directly pass function with parameter it will
//automatically get called and re-render the page