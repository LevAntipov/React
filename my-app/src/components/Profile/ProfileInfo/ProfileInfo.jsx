import classes from "./ProfileInfo.module.css"
import React from "react"
//Нужно что-то сделать со скачанными картинками, закинуть их в store и убрать из презентационной компоненты import-ы
import birthsday from './birthday.png'
import a_location from './location.png'
import education from './education.png'
import preloader from './../../../assets/images/loader.svg'
import { useStore } from 'react-redux'
import ProfileStatus from "./ProfileStatus"
import noPhotoUser from "./../../../assets/images/noPhotoUser.jpg"


function ProfileInfo(props) {
    //  const store = useContext(StoreContext)
    //  let privateInfo = store.getState().profilePage.profilePrivateData
    const store = useStore()
    let privateInfo = store.getState().profilePage.profilePrivateData
    
    const ProfilePrivateInfo = (props) => {
        return (
            <div className={classes["private-info"]}>
                <div>
                    <img className={`${classes['profile-info__img']} ${classes['profile-info__item']}`} src={props.img}></img>
                </div>
                <div className={classes['profile-info__item']}>{props.info}</div>
            </div>
        )
    }

    if (!props.profile) {
        return <img src={preloader} />
    }

    return (
        <div className={classes.profile}>
            <img className={`${classes.profile__img} ${classes.profile__item}`} src={props.profile.photos.large || noPhotoUser}></img>
            <div className={classes['profile-info']}>
                <ProfilePrivateInfo img={birthsday} info={privateInfo.birthsday} />
                <ProfilePrivateInfo img={a_location} info={privateInfo.location} />
                <ProfilePrivateInfo img={education} info={privateInfo.education} />
            </div>
            <ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus}/>
        </div>
    )
}

export default ProfileInfo