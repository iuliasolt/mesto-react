import React from "react";

function Card(props) {
   console.log(props.card)
    function handleCardClick()  {
        props.onCardClick(props.card); 
      }

      return(
        
        <article className="card">
            <button type="button" className="card__trash" aria-label="Удаление"></button>
            <img src={props.link} className="card__image" alt={props.name} onClick={handleCardClick}/>
            <div className="card__item">
                <h2 className="card__name">{props.name}</h2>
                <div className="card__container-like">
                    <button type="button" className="card__like" aria-label="Кнопка лайка"></button>
                    <p className="card__number-likes">{props.likes}</p>
                </div>
            </div>
        </article>
   
      )
      
     
}

export default Card