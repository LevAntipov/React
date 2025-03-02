import React from 'react';
import {Field,reduxForm } from 'redux-form'

const LoginForm = (props) => {
    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field name ={"login"} placeholder={'Login'} component ={"input"}/>
                </div>
                <div>
                    <Field name ={"password"} placeholder={'Password'} component ={"input"}/>
                </div>
                <div>
                    <Field name ={"rememderMe"} component ={"input"} type={'checkbox'} /> Remember me
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
    const onSubmit = (formData) =>{
        console.log(formData)
    }
    return (<div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
    )
}

export default Login