import { usersAPI, profileAPI } from '../api/api';
import { getAuthUserData } from './authReducer'
const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_USER_STATUS = "SET-USER-STATUS";
const DELETE_POST = "DELETE-POST"
const SET_USER_PHOTO = "SET-USER-PHOTO"
const INCORRECT_URL_FORMAT = "INCORRECT-URL-FORMAT"

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
    userStatus: "пусто",
    incorrectUrlFormat: true
}

export const profileReducer = (state = initialState, action) => {

    switch (action.type) {

        case (ADD_POST): {
            debugger
            return ({
                ...state,
                postsData: [...state.postsData, {
                    id: state.postsData.length + 1,
                    message: action.postText, likescount: ""
                }],
            })

        }
        case (DELETE_POST):
            return ({
                ...state,
                postsData: [state.postsData.filter(function (item) {
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
        case (SET_USER_PHOTO):
            return ({
                ...state,
                userProfile: { ...state.userProfile, photos: action.photos }
            })
        case (INCORRECT_URL_FORMAT):
            return ({
                ...state,
                incorrectUrlFormat: { ...action.incorrectUrls }
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

const setUserPhoto = (photos) => {
    return {
        type: SET_USER_PHOTO,
        photos
    }
}

const incorrectUrlFormatCorrect = (incorrectUrls) => {
    return {
        type: INCORRECT_URL_FORMAT,
        incorrectUrls
    }
}

export const getUserProfile = (userId) => async (dispatch) => {
    let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}

export const getUserStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setUserStatus(response.data))
}

export const updateUserStatus = (status) => async (dispatch) => {
    try {
        let response = await profileAPI.updateStatus(status)

        if (response.data.resultCode === 0) {
            dispatch(setUserStatus(status))
        }
    } catch(error){
        alert("error")
        debugger
        //сюда попадет, если, к примеру, неправильный api-key
    }
}

export const updateUserProfile = (data, setEditMode) => async (dispatch, getState) => {
    let response = await profileAPI.updateProfile(data)
    const ownerId = getState().auth.userId

    // let usId = getState
    if (response.data.resultCode === 0) {
        //Это делаю для автоматичекого обновления мини авы в header, нужно подправить
        dispatch(getUserProfile(ownerId))
        dispatch(incorrectUrlFormatCorrect([null]))
        return 1
    }
    else {
        let incorrectUrls = response.data.messages.map(item => {
            let arr = item.split(/[->>)\s]+/) //такое регулярное выражение тк ответ с сервера: "Invalid url format (Contacts->Website)" 
            return arr[arr.length - 2].toLowerCase()
        })
        debugger
        dispatch(incorrectUrlFormatCorrect(incorrectUrls))
    }
}

export const updateUserPhoto = (photo) => async (dispatch) => {
    let response = await profileAPI.updatePhoto(photo)
    if (response.data.resultCode === 0) {
        dispatch(setUserPhoto(response.data.data.photos))
        //Это делаю для автоматичекого обновления мини авы в header, нужно подправить
        dispatch(getAuthUserData())
    }
}

export default profileReducer;