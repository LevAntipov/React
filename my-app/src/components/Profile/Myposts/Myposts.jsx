import classes from './Myposts.module.css'
import Post from './Post/Post';
import React from 'react';

function Myposts(props) {

    let renderPosts = props.posts.map(item => <Post message={item.message} likesCount={item.likesCount} />)

    let newPostElement = React.createRef();

    let addPost = () => {
        //props.addPost(); - было 1.0
        //props.dispatch({type:"ADD-POST"}) - было 2.0, не подходит, тк получается, что нарушается принцип
        //                                    одиночной ответственности, в компоненте не должен создаваться объект
        //props.dispatch(addPostActionCreator()); - опять же компонента знает про dispatch, создаем MyPostsContainer и берем оттуда
        props.addPost();
    }

    let onChangeText = () => {
        
        let textOfPost = newPostElement.current.value;
        //props.updateNewPostText(textOfPost); - было
        //props.dispatch({type:"UPDATE-NEW-POST-TEXT",areatext:textOfPost}) - было 2.0, не подходит, тк получается, что нарушается принцип
        //                                                                    одиночной ответственности, в компоненте не должен создаваться объект
        //props.dispatch(updateNewPostTextActionCreator(textOfPost)); - опять же компонента знает про dispatch, создаем MyPostsContainer и берем оттуда
        props.updateNewPostText(textOfPost)
    }

    return (
        <div className={classes['posts-area']}>
            <div className={classes['write-form']}>
                <textarea
                    className={`${classes.textarea} ${classes['write-form__item']}`}
                    ref={newPostElement}
                    value={props.newPostText}
                    onChange={onChangeText} />

                <button
                    className={`${classes.button} ${classes['write-form__item']}`}
                    onClick={addPost}>
                    Добавить пост
                </button>
            </div>
            {renderPosts}
        </div>
    )
}

export default Myposts;