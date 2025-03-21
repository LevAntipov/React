import React from "react";
import noPhotoUser from './../../assets/images/noPhotoUser.jpg'
import classes from './Users.module.css'
import { NavLink } from "react-router";

let User = ({ user, index, followingInProgress, followStatusChange }) => {

    return (
        <div className={classes['user-card']} key={index}>
            <div className={classes['user-icon']}>
                <NavLink to={'/profile/' + user.id}>
                    <img alt="" src={user.photos.small == null ? noPhotoUser : user.photos.small} />
                </NavLink>
                <div>
                    {user.followed === true
                        ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => followStatusChange(user, false)}>unFollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => followStatusChange(user, true)}>Follow</button>}
                </div>
            </div>
            <div className={classes['user-info']}>
                <div className={classes['user-name']}>
                    <div>{user.name}</div>
                    <div>{user.status == null ? 'no status' : user.status}</div>
                </div>
                <div className={classes['user-location']}>
                    <div>{"user.location.city"}</div>
                    <div>{"user.location.country"}</div>
                </div>
            </div>
        </div>
    )





}

export default User;