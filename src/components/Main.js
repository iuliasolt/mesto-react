import React from "react";
import { api } from "../utils/api";
import { useEffect } from "react";
import Card from "./Card.js";
import { Spinner } from "./Spinner";

function Main(props) {
   
    const [cards, setCards] = React.useState([]);
    const [userInfo, setUserInfo] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(false);
    /*Рендер и отображение карточек на странице*/
    useEffect(() => {
        setIsLoading(true);

        Promise.all([api.getDataUser(), api.getInitialCards()])
            .then(([profileInfo, card]) => {
                setUserInfo(profileInfo);
                setCards(card);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setIsLoading(false));
    }, []);
   

  

    return (
        <main className="content">
            
            {isLoading ? (
                <Spinner />
            ) : (
                <section className="profile">
                    <button type="button" className="profile__edit-avatar" onClick={props.onEditAvatar}>
                        <img src={userInfo.avatar} className="profile__image" alt={userInfo.name} />
                    </button>
                    <div className="profile__info">
                        <h1 className="profile__name">{userInfo.name}</h1>
                        <p className="profile__job">{userInfo.about}</p>
                        <button type="button" className="profile__edit-button" aria-label="Кнопка: Редактировать" onClick={props.onEditProfile}></button>
                    </div>
                    <button type="button" className="profile__add-button" aria-label="Кнопка: Добавить" onClick={props.onAddPlace}></button>
                </section>
            )}
            
            <section className="cards" aria-label="Секция с фотографиями">
                
                {cards.map((card, _id) => (
                    <Card 
                    key={card._id} 
                    card={card} 
                    link={card.link} 
                    name={card.name} 
                    likes={card.likes.length} 
                    onCardClick={props.onCardClick} 
                    
                    /> 
                    
                ))}
                
                
            </section>
            
        </main>
       
    );
}

export default Main;
