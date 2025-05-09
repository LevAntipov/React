import { Route, Routes } from 'react-router';
import React, { lazy, Suspense } from 'react';
import './App.css';
//import DialogsContainer from './components/Dialogs/Dialogs';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import Login from './components/Login/Login'
// import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import { connect } from 'react-redux';
import { initializeApp } from './redux/appReducer';
import loader from './../src/assets/images/loader.svg'
import { HashRouter, BrowserRouter } from 'react-router';
import { Navigate } from 'react-router';
import store from './redux/reduxStore'
import { Provider } from 'react-redux';

const DialogsContainer = lazy(() => import('./components/Dialogs/Dialogs'));

class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    // if (!this.props.initialized) {
    //   return <img src={loader} />
    // }
    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>

          <React.Suspense fallback={loader}>
            <Routes>
              {/* Rout - если путь в браузере совпадает с path, то отрисовывается  element */}

              <Route path='/' element={
                <Navigate to='/profile' replace />}
              />

              <Route path='/profile/:profileId?' element={
                <ProfileContainer />}
              />

              <Route path='/dialogs' element={<DialogsContainer />
              }
              />


              <Route path='/users' element={
                <UsersContainer />}
              />

              <Route path='/login' element={
                <Login />}
              />

              <Route path='*' element={
                <div>404 NOT FOUND</div>}
              />

              <Route path='/music' Component={Music} />
              {/* <Route path='/news' Component={News} /> */}
              <Route path='/settings' Component={Settings} />

            </Routes>
          </React.Suspense>

        </div>

      </div>

    );
  }

}

let mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized
  }
}

let AppContainer = connect(mapStateToProps, { initializeApp })(App);

//Делается, чтобы не падали тесты (в index должна быть 1 компонента)
let SocialNetwork = () => {
  return (
    <React.StrictMode>
      <BrowserRouter  >

        <Provider store={store}>
          <AppContainer />
        </Provider>

      </BrowserRouter>
    </React.StrictMode>
  )
}

export default SocialNetwork