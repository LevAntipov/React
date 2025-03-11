import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { logout } from './../../redux/authReducer'


class HeaderAPIContainer extends React.Component {

    render() {
        return (
            <Header {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        avatar_TEST: state.auth.avatar_TEST
    }
}

const HeaderContainer = connect(mapStateToProps, {logout })(HeaderAPIContainer)

export default HeaderContainer