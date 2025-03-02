import { NavLink } from 'react-router';
import book from './book.png'
import classes from './Header.module.css'
import noPhotoUser from './../../assets/images/noPhotoUser.jpg'

function Header(props) {
    return (
        <header className={classes.header}>
            <img src={book}></img>
            <div className={classes.loginBlock}>
                {props.avatar_TEST ? <img src={props.avatar_TEST}/> : <img src={noPhotoUser}/>}
                {props.isAuth ? <NavLink to=''>{props.login}</NavLink> : <NavLink to='/login'>login</NavLink>}
            </div>
        </header>
    )
}

export default Header;