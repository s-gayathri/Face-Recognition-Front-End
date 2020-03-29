import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';

//mt0 margin top = 0
const Logo = () => {
    return (
        <div className = "ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max: 35 }} style={{ height:  150, width: 150 }} >
                <div className="Tilt-inner"> 
                    <img src= {brain} 
                        alt= "brain logo"
                        style= {{paddingTop: '12px', paddingRight: '10px', paddingLeft: '8px'}}>
                    </img>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;