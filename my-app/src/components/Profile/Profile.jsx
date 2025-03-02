import classes from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './Myposts/MyPostsContainer'
import withRoute from './../common/Kostily/withRoute'

function Profile(props) {

    return (
        <content>
            <ProfileInfo profile = {props.profile} status={props.status} updateUserStatus={props.updateUserStatus}/>
            <MyPostsContainer/>
        </content>
    )
}

export default Profile;