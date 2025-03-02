import React from "react";
import noPhotoUser from './../../assets/images/noPhotoUser.jpg'
import classes from './Users.module.css'
import { NavLink } from "react-router";
import preloader from './../../assets/images/loader.svg'

let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = []
    for (let i = pagesCount - 10; i <= pagesCount/*pagesCount*/; i++) {
        pages.push(i)
    }

    return (<>



        <div>
            <div>
                {pages.map(page =>
                    <span onClick={() => props.onPageChanged(page)}
                        className={props.currentPage == page ? classes["current-page"] : ""}>
                        {page}
                    </span>)}
            </div>
            {/* <button onClick={getUsers}>AddUsers</button>*/}

            {props.isFetching
                ? <img src={preloader} width={200} height={200} />
                : props.users.map(u => {
                    return (
                        <div className={classes['user-card']}>
                            <div className={classes['user-icon']}>
                                <NavLink to={'/profile/' + u.id}>
                                    <img src={u.photos.small == null ? noPhotoUser : u.photos.small} />
                                </NavLink>
                                <div>
                                    {u.followed == true
                                        ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => props.followStatusChange(u, false)}>unFollow</button>
                                        : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => props.followStatusChange(u, true)}>Follow</button>}
                                </div>
                            </div>
                            <div className={classes['user-info']}>
                                <div className={classes['user-name']}>
                                    <div>{u.name}</div>
                                    <div>{u.status == null ? 'no status' : u.status}</div>
                                </div>
                                <div className={classes['user-location']}>
                                    <div>{"u.location.city"}</div>
                                    <div>{"u.location.country"}</div>
                                </div>
                            </div>
                        </div>
                    )
                })}


        </div>
    </>
    )
}

export default Users;