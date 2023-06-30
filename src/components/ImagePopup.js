import React from "react";

function ImagePopup(props) {
    return (
      <div className={`popup popup_type_image" ${props.card ? 'popup_opened' : ' '}`}>
                <div className="popup__card-container">
                    <div className="popup__close popup__close_image" onClick={props.onClose}></div>
                    <img className="popup__image" src={props.card ? props.card.link : ' '} alt={props.card ? props.card.name : ' '} />
                    <p className="popup__paragraph">{props.card ? props.card.name : ' '}</p>
                </div>
            </div>
        )
        }
  export default ImagePopup