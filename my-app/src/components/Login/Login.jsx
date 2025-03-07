import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { required } from '../../utils/validators';
import { FormControl } from './../common/FormsControls/FormsControls'
import { login, logout } from './../../redux/authReducer'
import { connect } from 'react-redux';
import { Navigate } from 'react-router';


let Input = FormControl('input')

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={"email"} placeholder={'Email'}
                    component={Input} validate={required} />
            </div>
            <div>
                <Field name={"password"} placeholder={'Password'}
                    component={Input} validate={required} />
            </div>
            <div>
                <Field name={"rememderMe"} component={Input}
                    type={'checkbox'} validate={required} /> Remember me
            </div>
            <div>
                <button>Log in</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    // a unique name for the form
    form: 'login'
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    return (<div>
        <h1>Login</h1>
        {props.isAuth 
        ? <Navigate to='/profile' replace /> 
        : <LoginReduxForm onSubmit={onSubmit} />}
    </div>
    )
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }

}

export default connect(mapStateToProps, { login, logout })(Login)