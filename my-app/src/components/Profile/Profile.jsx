import classes from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './Myposts/MyPostsContainer'

function Profile(props) {

    return (
        <div>
            <ProfileInfo profile = {props.profile} status={props.status} updateUserStatus={props.updateUserStatus}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;