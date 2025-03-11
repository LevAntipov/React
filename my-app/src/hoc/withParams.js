import {
    useParams,
} from "react-router";

export function withParams(Component) {
    function ComponentWithRouterProp(props) {
        let params = useParams();
        return (
            <Component
                {...props}
                profileId={params.profileId}
            />
        );
    }

    return ComponentWithRouterProp;
} 





{/*import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";

export function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                match={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}*/}




