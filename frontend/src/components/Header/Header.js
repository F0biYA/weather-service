import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Header.css';

function Header(props) {
    const currentUser = useContext(CurrentUserContext);
    return <header className="header">
        <span className="header__name">{currentUser.name}</span>
        <Link className="header__link" to='/signin' onClick={props.signOut}>Выйти</Link>
    </header>
}

export default Header;