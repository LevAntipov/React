import { getAuthUserData } from "./authReducer";

const INITIALIZED_SUCCESS = "INITIALIZED-SUCCESS";

// type InitialStateType = {
//     initialized: boolean,
// }

// type InitializedSuccessType = {
//     type: typeof INITIALIZED_SUCCESS
// }




let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {

    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized:true
            }
        default:
            return state;
    }
}

export const initializedSuccess = () => {
    return {
        type: INITIALIZED_SUCCESS,
    }
}

export const initializeApp = () => { //thunk creator
    return (
        (dispatch) => { //thunk
            let promis = dispatch(getAuthUserData())
            promis.then(()=>dispatch(initializedSuccess()))
        }
    )
}


export default appReducer;