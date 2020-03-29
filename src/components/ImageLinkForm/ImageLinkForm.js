import React from 'react';
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit}) => {
    return (
        <div>
           <p className= "f3">
                {'This Magic Brain will detect faces in your picture. Upload one and give it a try.'}
           </p> 
           <div className= "center">
            <div className= "form center pa4 br3 shadow-5">
                <input type= "text" 
                    className="f4 pv2 margin"
                    style= {{width: '100%'}}
                    onChange= {onInputChange}>
                </input>
                <button 
                    className= "grow f4 link ph3 pv2 dib white bg-light-purple"
                    onClick= {onButtonSubmit}>
                    Detect
                </button>
            </div>
           </div> 
        </div>
    );
}

export default ImageLinkForm;