import classes from './Myposts.module.css'
import Post from './Post/Post';
import React from 'react';
import {Field,reduxForm } from 'redux-form'
import { Textarea } from '../../common/FormsControls/FormsControls';
import {maxLengthCreator,required} from './../../../utils/validators'

const maxLength10 = maxLengthCreator(10)

function Myposts(props) {

    let renderPosts = props.posts.map((item, index) => <Post message={item.message} likesCount={item.likesCount} 
                                                        key = {index}/>)

    let newPostElement = React.createRef();

    let addPostText = (value) => {
        //props.addPost(); - было 1.0
        //props.dispatch({type:"ADD-POST"}) - было 2.0, не подходит, тк получается, что нарушается принцип
        //                                    одиночной ответственности, в компоненте не должен создаваться объект
        //props.dispatch(addPostActionCreator()); - опять же компонента знает про dispatch, создаем MyPostsContainer и берем оттуда
        props.addPost(value.postText);
    }

   {/*let onChangeText = () => {

        let textOfPost = newPostElement.current.value;
        //props.updateNewPostText(textOfPost); - было
        //props.dispatch({type:"UPDATE-NEW-POST-TEXT",areatext:textOfPost}) - было 2.0, не подходит, тк получается, что нарушается принцип
        //                                                                    одиночной ответственности, в компоненте не должен создаваться объект
        //props.dispatch(updateNewPostTextActionCreator(textOfPost)); - опять же компонента знает про dispatch, создаем MyPostsContainer и берем оттуда
        props.updateNewPostText(textOfPost)
    }*/} 

    return (
        <div className={classes['posts-area']}>
            <AddPostReduxForm onSubmit={addPostText} />
            {renderPosts}
        </div>
    )
}

const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            
                <Field name ={"postText"} placeholder={'Text of post'} 
                component ={Textarea} validate={[required,maxLength10]}/>
                <button>
                    Добавить пост
                </button>
         
        </form>
    )
}
const AddPostReduxForm = reduxForm({form:'post'})(AddPostForm)

export default Myposts;