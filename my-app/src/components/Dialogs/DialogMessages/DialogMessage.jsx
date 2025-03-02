import React from 'react'
import classes from './DialogMessages.module.css'




function DialogMessages(props) {

    const MessageItem = (props) => {
        return (
            <div className={classes.dialogs__message__item}>
                {props.message}
            </div>
        )
    }

    let renderMessages = props.messages.map(item => <MessageItem message={item.message} />)

    let newMessageElement = React.createRef();

    let addMessage = () => {
       // props.dispatch({type:"ADD-MESSAGE"})
       props.addMessage();
    }

    let onChangeText = () => {
        let textOfMessage = newMessageElement.current.value;
        //props.dispatch({type:"UPDATE-NEW-MESSAGE-TEXT", areatext:textOfMessage})
        props.updateNewMessageText(textOfMessage)
    }



    return (
        <div className={classes.dialogs__message}>
            <div>
                {renderMessages}
            </div>
            <div className={classes['write-form']}>
                <textarea
                    className={`${classes.textarea} ${classes['write-form__item']}`}
                    ref={newMessageElement}
                    value={props.newMessageText}
                    onChange={onChangeText}
                />

                <button
                    className={`${classes.button} ${classes['write-form__item']}`}
                    onClick={addMessage}
                >
                    Добавить пост
                </button>
            </div>

        </div>
    )
}

export default DialogMessages;