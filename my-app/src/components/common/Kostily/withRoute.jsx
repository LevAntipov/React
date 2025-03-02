import { useLocation, useNavigate, useParams } from "react-router";

function WithRouter(){
    let location = useLocation()
    let userId = location.pathname.split('/').pop()
    return (<>{userId}</>);
}

export default WithRouter
