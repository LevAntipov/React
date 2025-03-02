import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profileReducer';
import Myposts from './Myposts';
import { connect } from 'react-redux';



const mapStateToProps = (state) =>{
    return{
        posts:state.profilePage.postsData,
        newPostText:state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        updateNewPostText: (textOfPost) =>{
            dispatch(updateNewPostTextActionCreator(textOfPost))
        },
        addPost: ()=>{
            dispatch(addPostActionCreator())
        }
    }
}

const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(Myposts)

export default MyPostsContainer;