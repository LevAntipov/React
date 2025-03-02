import React from 'react';
import { BrowserRouter } from 'react-router';
import ReactDOM from "react-dom/client"
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';
import store from './redux/reduxStore'
import { Provider } from 'react-redux';




const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <React.StrictMode>
            <BrowserRouter>

                <Provider store = {store}>
                    <App />
                </Provider>

            </BrowserRouter>
        </React.StrictMode>
    );

/*

Было до внедрения react-redux, функция connect в container сама обновляет часть дерева, которую нужно


//redux сам не передает state, нужно делать так
store.subscribe(() => {
    let state = store.getState();
    rerenderTree(state);
});
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
