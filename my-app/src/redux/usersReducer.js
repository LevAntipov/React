import { usersAPI } from "../api/api";
import {updateObjectInArray} from "./../utils/object-helpers"

const ADD_FRIEND = "ADD-FRIEND";
const DELETE_FRIEND = "DELETE-FRIEND"
const SET_USERS = "SET-USERS"
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE"
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT"
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING"
const FOLLOWINGINPROGRESS = "FOLLOWING-IN-PROGRESS"

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 20,
    page: 1,
    isFetching: true,
    followingInProgress: [],
}

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_FRIEND:
            return (
                {
                    ...state,
                    users:updateObjectInArray(state.users,action.userId,"id",{followed: true}),
                    // users: state.users.map(user => {
                    //     if (user.id === action.userId) {
                    //         return { ...user, followed: true } //Изменять state нельзя, возвращаем копию
                    //     }
                    //     return user;
                    // })
                }
            )
        case DELETE_FRIEND:
            return (
                {
                    ...state,
                    users:updateObjectInArray(state.users,action.userId,"id",{followed: false}),
                }
            )
        case SET_USERS:
            return ({
                ...state,
                users: action.users
            })
        case SET_CURRENT_PAGE:
            return {
                ...state,
                page: action.page
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.count
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case FOLLOWINGINPROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : [state.followingInProgress.filter(id => id !== action.userId)]
            }
        default:
            return state;
    }

}

export const addFriend = (userId) => {
    return {
        type: ADD_FRIEND,
        userId
    }
}

export const deleteFriend = (userId) => {
    return {
        type: DELETE_FRIEND,
        userId
    }
}

export const setUsers = (users) => {
    return {
        type: SET_USERS,
        users
    }
}

export const setCurrentPage = (page) => {
    return {
        type: SET_CURRENT_PAGE,
        page
    }
}

export const setTotalUsersCount = (count) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        count
    }
}

export const setIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
}

export const setFollowingInProgress = (isFetching, userId) => {

    return {
        type: FOLLOWINGINPROGRESS,
        isFetching,
        userId
    }
}

export const requestUsers = (page, pageSize) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))

        let response = await usersAPI.getUsers(page, pageSize)
        dispatch(setIsFetching(false))
        dispatch(setUsers(response.items));
        dispatch(setTotalUsersCount(response.totalCount));
    }
}

export const foolowUnfollowFlow = async (dispatch, user, apiMethod, actionCreator) => {
    dispatch(setFollowingInProgress(true, user.id))

    let response = await apiMethod(user.id)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(user.id))
    }

    dispatch(setFollowingInProgress(false, user.id))
}

export const followStatusChange = (user, bool) => {
    if (bool) { //true - когда НАДО подписаться follow
        return async (dispatch) => {

            foolowUnfollowFlow(dispatch, user, usersAPI.follow.bind(usersAPI), addFriend)
        }
    }

    else {
        return async (dispatch) => {

            foolowUnfollowFlow(dispatch, user, usersAPI.unfollow.bind(usersAPI), deleteFriend)
        }
    }
}


export default usersReducer;