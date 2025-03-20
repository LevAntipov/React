import React from 'react';
import { login, logout } from './../../redux/authReducer'
import { connect } from 'react-redux';
import { Navigate } from 'react-router';
import { LoginForm } from './LoginForm';
import styles from './Login.module.css'


const Login = ({login,isAuth}) => {
    return (<div>
        <span className={styles.loginItem}>Login</span>
        {isAuth
            ? <Navigate to='/profile' replace />
            : <LoginForm login={login}/>}
    </div>
    )
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }

}

export default connect(mapStateToProps, { login, logout })(Login)
