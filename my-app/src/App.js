import { Route, Routes } from 'react-router';
import React from 'react';
import './App.css';
import DialogsContainer from './components/Dialogs/Dialogs';
import HeaderContainer from './components/Header/HeaderContainer';
import Navigation from './components/Navigation/Navigation';
import ProfileContainer from './components/Profile/ProfileContainer';
import Login from './components/Login/Login'
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import { connect } from 'react-redux';
import { initializeApp } from './redux/appReducer';
import loader from './../src/assets/images/loader.svg'

class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <img src={loader} />
    }
    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navigation />
        <div className='app-wrapper-content'>
          <Routes>
            {/* Rout - если путь в браузере совпадает с path, то отрисовывается  element */}

            <Route path='/profile/:profileId?' element={
              <ProfileContainer />}
            />

            {/* <Route path='/dialogs' element={
              <DialogsContainer />}
            /> */}

            <Route path='/users' element={
              <UsersContainer />}
            />

            {/* <Route path='/login' element={
              <Login />}
            /> */}

            <Route path='/music' Component={Music} />
            <Route path='/news' Component={News} />
            <Route path='/settings' Component={Settings} />

          </Routes>
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

export default connect(mapStateToProps, { initializeApp })(App);

