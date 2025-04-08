import { usersAPI, authAPI,securityAPI } from "../api/api";
//import { stopSubmit } from "redux-form";

const SET_USER_DATA = "auth/SET-USER-DATA";
const SET_USER_PROFILE_DATA = "auth/SET-USERS-PROFILE-DATA";
const INCORRECT_VALIDATION_USER_DATA = "INCORRECT-VALIDATION-USER-DATA"
const GET_CAPTCHA_URL_SUCCESS = "GET-CAPTCHA-URL-SUCCESS"

let initialState = {
    userId: undefined,
    email: null,
    login: null,
    isAuth: false,
    isFetching: true,
    captchaUrl:null,

    //Testing
    avatar_TEST: null,
    validationMessage:false
}

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                isAuth: action.isAuth
            }
        case SET_USER_PROFILE_DATA:
            return {
                ...state,
                avatar_TEST: action.avatar_TEST
            }
        case INCORRECT_VALIDATION_USER_DATA:
            return{
                ...state,
                validationMessage:action.messages[0]
            }
            case GET_CAPTCHA_URL_SUCCESS:
                return{
                    ...state,
                    captchaUrl:action.captchaUrl
                }
        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => {
    return {
        type: SET_USER_DATA,
        payload: { userId, email, login },
        isAuth
    }
}

export const setUserAvatar = (avatar_TEST) => {
    return {
        type: SET_USER_PROFILE_DATA,
        avatar_TEST
    }
}

export const getCaptchaUrlSuccess = (captchaUrl) => {
    return {
        type: GET_CAPTCHA_URL_SUCCESS,
        captchaUrl
    }
}

export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let login = response.data.data.login;
        let id = response.data.data.id;
        let email = response.data.data.email;
        dispatch(setAuthUserData(id, email, login, true))

        usersAPI.getProfile(id).then(response => {
            dispatch(setUserAvatar(response.data.photos.small))

        })
    }

}

//TESTING
export const incorrectValidationOfUserData = (messages) => {
    return{
        type:INCORRECT_VALIDATION_USER_DATA,
        messages
    }
}
//TESTING

export const login = (email, password,captchaValue) => async (dispatch) => {

    let response = await authAPI.login(email, password, captchaValue)
    if (response.data.resultCode === 0) {
        dispatch(incorrectValidationOfUserData(false))
        dispatch(getAuthUserData())
        dispatch(getCaptchaUrlSuccess(null)) //чтобы после logout каптчи не было
    }
    else {
        if (response.data.resultCode === 10){
            dispatch(getCaptchaUrl())
        }
        let messages = response.data.messages
        dispatch(incorrectValidationOfUserData(messages)) 
        return response.data.resultCode
                // // это было для REDUX-FORM
        // let message = response.data.messages.length > 0 ? response.data.messages[0] : "some error"
        // let action = stopSubmit("login",{_error:message}) //actioncreator из reduxForm, позволяет
        // dispatch(action)                                          //получить общую ошибку для всей формы
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    let response = await securityAPI.getCaptcha()
        dispatch(getCaptchaUrlSuccess(response.data.url))
}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer;