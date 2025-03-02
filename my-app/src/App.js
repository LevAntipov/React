import { Route, Routes } from 'react-router';
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


function App(props) {
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

          <Route path='/dialogs' element={
            <DialogsContainer />}
          />

          <Route path='/users' element={
            <UsersContainer />}
          />

          <Route path='/login' element={
            <Login />}
          />

          <Route path='/music' Component={Music} />
          <Route path='/news' Component={News} />
          <Route path='/settings' Component={Settings} />

        </Routes>
      </div>

    </div>

  );
}

export default App;

