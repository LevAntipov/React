import Profile from './Profile';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserProfile,getUserStatus,updateUserStatus } from './../../redux/profileReducer';
import { compose } from 'redux';
import {withParams} from './../../hoc/withParams'
import { useNavigate } from 'react-router';

//import {withAuthRedirect} from './../../hoc/withAuthRedirect'


const ProfileContainer = (props) =>{
    const navigate = useNavigate()
    
    useEffect(()=>{
        let userId = props.profileId
        if (!userId) {
          //  userId=2
        
            userId = props.authorizedUserId
            if(!userId){
                navigate('/login')
                //this.props.history.push('/login')
                return
            }
        }
        props.getUserProfile(userId)
        props.getUserStatus(userId)
        

    },[props.isAuth, navigate]) 

    
        return (
            <div>
                <Profile {...props} profile={props.userProfile} status ={JSON.stringify(props.userStatus)}
                                         updateUserStatus = {props.updateUserStatus} />
            </div>
        )
    

}

const mapStateToProps = (state) => {
    return {
        userProfile: state.profilePage.userProfile,
        userStatus: state.profilePage.userStatus,
        authorizedUserId: state.auth.userId,
        isAuth:state.auth.isAuth
    }
}

export default compose(
    connect(mapStateToProps, { getUserProfile,getUserStatus,updateUserStatus }),
    withParams,
)(ProfileContainer)


{/*class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.profileId
        if (!userId) {
          //  userId=2
        
            userId = this.props.authorizedUserId
            if(!userId){
               
               //this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)

    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.userProfile} status ={JSON.stringify(this.props.userStatus)}
                                         updateUserStatus = {this.props.updateUserStatus} />
            </div>
        )
    }

}*/}