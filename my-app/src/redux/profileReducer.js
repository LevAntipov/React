import { usersAPI, profileAPI } from '../api/api';
const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_USER_STATUS = "SET-USER-STATUS";
const DELETE_POST = "DELETE-POST"

//redux прогоняет какие-то свои action-ы
// в начале, при инициализации проекта redux возвращает вместо state - undefined ->
// (profileReducer не получается в параметры state) 
// создается начальное значение state, чтобы это обойти 
let initialState = {
    profilePrivateData: {
        birthsday: "04.06.2002",
        location: "Moscow",
        education: "Student",
        qwe: ""
    },
    postsData: [
        { id: 1, message: 'Привет!', likesCount: 0, },
        { id: 2, message: 'Изучаю пропсы', likesCount: "0", },
    ],
    userProfile: null,
    userStatus: "пусто"
}

export const profileReducer = (state = initialState, action) => {

    switch (action.type) {

        case (ADD_POST): {
            debugger
            return ({
                ...state,
                postsData: [...state.postsData, { id:state.postsData.length + 1,
                                                 message: action.postText, likescount: "" }],
            })

        }
        case (DELETE_POST):
            return({
                ...state,
                postsData:[state.postsData.filter(function(item){
                    return item !== action.postId
                })]
            })
        case (SET_USER_PROFILE):
            return ({
                ...state,
                userProfile: action.profile
            })
        case (SET_USER_STATUS):
            return ({
                ...state,
                userStatus: action.status
            })
        default:
            return state;
    }

}

export const addPostActionCreator = (postText) => {
    return {
        type: ADD_POST,
        postText
    }
}

export const deletePostActionCreator = (postId) => {
    return {
        type: DELETE_POST,
        postId
    }
}

const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
}

const setUserStatus = (status) => {
    return {
        type: SET_USER_STATUS,
        status
    }
}



export const getUserProfile = (userId) => {
    return (
        (dispatch) => {
            usersAPI.getProfile(userId).then(response => {
                dispatch(setUserProfile(response.data))
            })
        }
    )
}

export const getUserStatus = (userId) => {
    return (
        (dispatch) => {
            profileAPI.getStatus(userId).then(response => {
                dispatch(setUserStatus(response.data))
            })
        }
    )
}

export const updateUserStatus = (status) => {
    return (
        (dispatch) => {
            profileAPI.updateStatus(status).then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setUserStatus(status))
                }
            })
        }
    )
}


export default profileReducer;