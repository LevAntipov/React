import { connect } from "react-redux";
import { addFriend, deleteFriend, setFollowingInProgress, getUsers, setCurrentPage,followStatusChange} from './../../redux/usersReducer'
import Users from './Users';
import React from 'react';
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";


class UsersAPIcomponent extends React.Component {
    //это можно не писать, тк происходит по умолчанию 
    /*constructor(props) {
        super(props)
    }*/

    componentDidMount() {
        //IN reducer
        this.props.getUsers(this.props.currentPage,this.props.pageSize)
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
        this.props.getUsers(page,this.props.pageSize)
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
                currentPage={this.props.currentPage}
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
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }

}

/*const mapDispatchToProps = (dispatch) => {
    return ({
        addFriend: (userId) => {
            dispatch(addFriendAC(userId))
        },
        deleteFrined: (userId) => {
            dispatch(deleteFriendAC(userId))
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (page) => {
            dispatch(setCurrentPageAC(page))
        },
        setTotalUsersCount: (count) => {
            dispatch(setTotalUsersCountAC(count))
        },
        setIsFetching: (isFetching) => {
            dispatch(setIsFetchingAC(isFetching))
        }
    }
    )
}*/

export default compose(
    connect(mapStateToProps, 
        { addFriend, deleteFriend,setCurrentPage,//в сокращенной записи сюда попадают именно колбеки
         setFollowingInProgress, getUsers,followStatusChange}),
    withAuthRedirect
)(UsersAPIcomponent)

/*const UsersContainer = connect(mapStateToProps, 
    { addFriend, deleteFriend,setCurrentPage,//в сокращенной записи сюда попадают именно колбеки
     setFollowingInProgress, getUsers,followStatusChange})(withAuthRedirect(UsersAPIcomponent))*/

//export default UsersContainer;