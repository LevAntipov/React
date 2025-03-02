import { usersAPI,authAPI } from "../api/api";

const SET_USER_DATA = "SET-USER-DATA"; 
const SET_USER_PROFILE_DATA = "SET-USERS-PROFILE-DATA";

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: true,

    avatar_TEST:null
}

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth:true
            }
        case SET_USER_PROFILE_DATA:
            return{
                ...state,
                avatar_TEST:action.avatar_TEST
            }

        default:
            return state;
    }
}

export const setAuthUserData = (userId,email,login) => {
    return {
        type: SET_USER_DATA,
        data : {userId,email,login}
    }
}

export const getAuthUserData = () =>{
    return(
     (dispatch) => {
        authAPI.me().then(response => {
            if (response.data.resultCode == 0) {
                let login = response.data.data.login;
                let id = response.data.data.id;
                let email = response.data.data.email;
                dispatch(setAuthUserData(id, email, login))

                usersAPI.getProfile(id).then(response => {
                   dispatch(setUserAvatar(response.data.photos.small))
                    
                })
            }
            
        })
     }  
    )
}

export const setUserAvatar = (avatar_TEST) => {
    return {
        type: SET_USER_PROFILE_DATA,
        avatar_TEST
    }
}

export default authReducer;