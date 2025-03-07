import React from "react";
import Header from "./Header";
import { getAuthUserData } from "../../redux/authReducer";
import { connect } from "react-redux";
import { logout } from './../../redux/authReducer'


class HeaderAPIContainer extends React.Component {

    componentDidMount() {
        this.props.getAuthUserData();
    }

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

const HeaderContainer = connect(mapStateToProps, { getAuthUserData, logout })(HeaderAPIContainer)

export default HeaderContainer