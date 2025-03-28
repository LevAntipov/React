import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import profileReducer from "./profileReducer";
import messagesReducer from "./messagesReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import appReducer from "./appReducer";
import {thunk} from "redux-thunk";
//import { reducer as formReducer } from 'redux-form'

let reducers = combineReducers({   // объяснение названия ключей объекта:
    profilePage: profileReducer,   // за --profile page-- отвечает profile reducer,который возвращает объект
    messagesPage: messagesReducer, // за --messages page -- отвечает messages reducer
                                   //...
    usersPage: usersReducer,
    auth:authReducer,
    //обязательно называем form, тк библиотека по дефолту будет обращаться к нему
    // form:formReducer,
    app:appReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

//Это было до расширения гугл redux
//applyMiddleware - промежуточный уровень, чтобы диспатчить функцию
//let store = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store