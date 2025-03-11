import { connect } from "react-redux";
import { addFriend, deleteFriend, setFollowingInProgress, requestUsers, setCurrentPage,followStatusChange} from './../../redux/usersReducer'
import Users from './Users';
import React from 'react';
import { compose } from "redux";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from "../../redux/usersSelectors";


class UsersAPIcomponent extends React.Component {
    //это можно не писать, тк происходит по умолчанию 
    /*constructor(props) {
        super(props)
    }*/

    componentDidMount() {
        //IN reducer
        this.props.requestUsers(this.props.page,this.props.pageSize)
    }

  /*  followStatusChange = (user) => {
        debugger
        this.props.setFollowingInProgress(true,user.id)
        //Запрос с сервака, подписан ли
            if (!user.followed) {
                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/` + user.id, {}, {
                    withCredentials: true,
                    headers: {
                        "API-KEY": 'b4f445ee-3c6c-4911-a674-b48fef1898bd'
                    }
                }).then(response => {
                    if (response.data.resultCode == 0) {
                        this.props.addFriend(user.id)
                    }
                    this.props.setFollowingInProgress(false,user.id)
                })

            }
            else {
                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/` + user.id, {
                    withCredentials: true,
                    headers: {
                        "API-KEY": 'b4f445ee-3c6c-4911-a674-b48fef1898bd'
                    }
                }).then(response => {
                    if (response.data.resultCode == 0) {
                        this.props.deleteFriend(user.id)
                    }
                    this.props.setFollowingInProgress(false,user.id)
                })
            }
    }*/

    onPageChanged = (page) => {
        this.props.requestUsers(page,this.props.pageSize)
        this.props.setCurrentPage(page)
      {/*  this.props.setIsFetching(true)
        this.props.setCurrentPage(page)

        usersAPI.getUsers(page, this.props.pageSize).then(data => {
            this.props.setIsFetching(false)
            this.props.setUsers(data.items);
        })*/}
    }

    render() {

        return (
            <>
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                onPageChanged={this.onPageChanged}
                isFetching={this.props.isFetching}
                page={this.props.page}
                users={this.props.users}
                followingInProgress = {this.props.followingInProgress}
                followStatusChange = {this.props.followStatusChange}
            />
            </>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        page: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }

}

/*const mapDispatchToProps = (dispatch) => {
    return ({
        addFriend: (userId) => {
            dispatch(addFriendAC(userId))
        }, 
    }
    )
}*/

export default compose(
    connect(mapStateToProps, 
        { addFriend, deleteFriend,setCurrentPage,//в сокращенной записи сюда попадают именно колбеки
         setFollowingInProgress,requestUsers,followStatusChange}),
    //withAuthRedirect
)(UsersAPIcomponent)

