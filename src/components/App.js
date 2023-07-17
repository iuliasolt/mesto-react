import React from "react";
import { useEffect } from "react";
import Footer from "./Footer.js";
import Header from "./Header.js";
import Main from "./Main.js";
import ImagePopup from "./ImagePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { api } from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";

function App() {
    const [isProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(false);
    const [cards, setCards] = React.useState([]);
    /*Рендер и отображение карточек на странице*/
    useEffect(() => {
        setIsLoading(true);

        Promise.all([api.getDataUser(), api.getInitialCards()])
            .then(([profileInfo, card]) => {
                setCurrentUser(profileInfo);
                setCards(card);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setIsLoading(false));
    }, []);

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

    
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        // Отправляем запрос в API и получаем обновлённые данные карточки
        if (!isLiked) {
            api.setLike(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
                })
                .catch((err) => console.log(err));
        } else {
            api.deleteLike(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
    
    const handleCardDelete = (card) => {
        api.deleteCard(card._id)
            .then(() => {
                /* используя методы массива, создаем новый массив карточек newCards, где не будет карточки, которую мы только что удалили */
                const newCard = cards.filter((c) => c._id !== card._id);
                setCards(newCard);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setIsLoading(false));
    };

    function handleUpdateUser(data) {
        api.setUserData(data)
            .then((newUser) => {
                setCurrentUser(newUser);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    }

    function handleUpdateAvatar({ avatar }) {
        api.setUserAvatar({
            avatar: avatar,
        })
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    }

    function handleAddPlaceSubmit({ name, link }) {
        api.addNewCard({
            name: name,
            link: link,
        })
            .then((data) => {
                const newCard = data;
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(`${err} - 'Ошибка отправки данных'`))
            .finally(() => setIsLoading(false));
    }

    function handlePopupCloseClick(evt) {
        if (evt.target.classList.contains('popup')) {
            closeAllPopups();
        }
    }

    function closeAllPopups() {
        setIsProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null);
    }

    useEffect(() => {
        if (isProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isEditProfilePopupOpen || selectedCard) 
        {
            function handleEsc(evt) {
                if (evt.key === 'Escape') {
                    closeAllPopups();
                }
            }
            document.addEventListener('keydown', handleEsc);
            return () => {
                document.removeEventListener('keydown', handleEsc);
            }
        }

    }, [isProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isEditProfilePopupOpen, selectedCard])

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__content">
                    <Header />
                    <Main
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        
                        cards={cards}
                        isLoading={isLoading}
                    />
                    <Footer />
                    <EditProfilePopup 
                        isOpen={isEditProfilePopupOpen} 
                        onClose={closeAllPopups} 
                        onCloseClick={handlePopupCloseClick}
                        onUpdateUser={handleUpdateUser} 
                    />

                    <AddPlacePopup 
                        isOpen={isAddPlacePopupOpen} 
                        onCloseClick={handlePopupCloseClick}
                        onClose={closeAllPopups} 
                        onAddPlace={handleAddPlaceSubmit} 
                    />

                    <EditAvatarPopup 
                        isOpen={isEditAvatarPopupOpen} 
                        onCloseClick={handlePopupCloseClick}
                        onClose={closeAllPopups} 
                        onUpdateAvatar={handleUpdateAvatar} 
                    />

                    <ImagePopup 
                        card={selectedCard} 
                        onCloseClick={handlePopupCloseClick}
                        onClose={closeAllPopups} 
                    />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
