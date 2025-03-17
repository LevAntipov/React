import { usersAPI, authAPI } from "../api/api";
//import { stopSubmit } from "redux-form";

const SET_USER_DATA = "SET-USER-DATA";
const SET_USER_PROFILE_DATA = "SET-USERS-PROFILE-DATA";

let initialState = {
    userId: undefined,
    email: null,
    login: null,
    isAuth: false,
    isFetching: true,

    avatar_TEST: null
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

export const getAuthUserData = () => {
    return (
        (dispatch) => {
          return  authAPI.me().then(response => {
                if (response.data.resultCode === 0) {
                    let login = response.data.data.login;
                    let id = response.data.data.id;
                    let email = response.data.data.email;
                    dispatch(setAuthUserData(id, email, login, true))

                    usersAPI.getProfile(id).then(response => {
                        dispatch(setUserAvatar(response.data.photos.small))

                    })
                }

            })
        }
    )
}

// export const login = (email,password,rememberMe) => {
//     return (
//         (dispatch) => {
//             authAPI.login(email,password,rememberMe).then(response => {
//                 if (response.data.resultCode === 0) {
//                     dispatch(getAuthUserData())
//                 }
//                 else{
//                     let message = response.data.messages.length>0 ? response.data.messages[0] : "some error" 
//                     let action = stopSubmit("login",{_error:message}) //actioncreator из reduxForm, позволяет
//                     dispatch(action)                                          //получить общую ошибку для всей формы
//                 }
//             })
//         }
//     )
// }

export const logout = () => (dispatch) => {
    authAPI.logout().then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null,null,null,false))
        }
    })
}





export default authReducer;