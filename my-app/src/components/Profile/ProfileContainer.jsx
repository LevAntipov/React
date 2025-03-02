import Profile from './Profile';
import React from 'react';
import { connect } from 'react-redux';
import { getUserProfile,getUserStatus,updateUserStatus } from './../../redux/profileReducer';
import { compose } from 'redux';
import {withParams} from './../../hoc/withParams'


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.profileId
        if (!userId) {
            userId = 32165;
        }
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)

    }

    render() {
        return (
            <content>
                {/* {withRoute(<Profile {...this.props} profile = {this.props.usersProfile}/>)}*/}
                <Profile {...this.props} profile={this.props.userProfile} status ={JSON.stringify(this.props.userStatus)}
                                         updateUserStatus = {this.props.updateUserStatus} />
            </content>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        userProfile: state.profilePage.userProfile,
        userStatus: state.profilePage.userStatus
    }
}

export default compose(
    connect(mapStateToProps, { getUserProfile,getUserStatus,updateUserStatus }),
   // withAuthRedirect,
   withParams,
)(ProfileContainer)



{/*const ContainerWithParams = (props) => {
    const params = useParams();
    let profileId = params.profileId;
    return <ProfileContainer {...props} profileId={profileId} />
}*/}
//const ContainerWithParams = withRouter(ProfileContainer)
//let AuthRedirectComponent = withAuthRedirect(ContainerWithParams)


//export default connect(mapStateToProps, { getUserProfile })(AuthRedirectComponent)