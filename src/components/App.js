import React from "react";
import Footer from "./Footer.js";
import Header from "./Header.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

function App() {
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }
    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null);
    }
    return (
        <div className="page">
            <div className="page__content">
                <Header />
                <Main 
                  onEditAvatar={handleEditAvatarClick} 
                  onEditProfile={handleEditProfileClick} 
                  onAddPlace={handleAddPlaceClick} 
                  onCardClick={handleCardClick} 
                 />
                <Footer />
                <PopupWithForm
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    name={"more-info"}
                    title={"Редактировать профиль"}
                    form={"profileEdit"}
                    buttonText={"Сохранить"}
                    >
                            <input id="username" type="text" name="name" className="popup__text popup__text_type_name" placeholder="Имя" minLength="2" maxLength="40" required />
                            <span id="error-username" className="popup__error-message"></span>
                            <input id="job" type="text" name="about" className="popup__text  popup__text_type_job" placeholder="О себе" minLength="2" maxLength="200" required />
                            <span id="error-job" className="popup__error-message"></span>
                        
                  </PopupWithForm>

                <PopupWithForm
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    name={"card-add"}
                    title={"Новое место"}
                    form={"profileAdd"}
                    buttonText={"Создать"}
                    >
                            <input id="title" type="text" name="name" className="popup__text  popup__text_type_title" placeholder="Название" minLength="2" maxLength="30" required />
                            <span id="error-title" className="popup__error-message"></span>
                            <input id="link" type="url" name="link" className="popup__text  popup__text_type_link" placeholder="Ссылка на картинку" required />
                            <span id="error-link" className="popup__error-message"></span> 
                </PopupWithForm>

                <PopupWithForm
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    name={"avatar"}
                    title={"Обновить аватар"}
                    form={"profileAvatar"}
                    buttonText={"Сохранить"}
                    >
                            <input id="linkAvatar" type="url" name="avatar" className="popup__text  popup__text_type_link" placeholder="Ссылка на картинку" required />
                            <span id="error-linkAvatar" className="popup__error-message"></span>
                </PopupWithForm>

                <ImagePopup 
                  card={selectedCard} 
                  onClose={closeAllPopups} />
            </div>
        </div>
    );
}

export default App;
