import React from 'react'
import classes from './DialogMessages.module.css'
//import { Field, reduxForm } from 'redux-form'
import { Textarea } from '../../common/FormsControls/FormsControls'
import {required,maxLengthCreator} from './../../../utils/validators'
import {FormControl} from './../../common/FormsControls/FormsControls'

const maxLength50 = maxLengthCreator(50)
let Area = FormControl("textarea")

// const AddMessageForm = (props) => {
//     //   const { onSubmit } = props //новый синтаксис
//     return (
//         <form onSubmit={props.handleSubmit}>
//             <div className={classes['write-form']}>
//                 <Field name={"addMessage"} placeholder={'Mesage:'} 
//                 component={Area} validate = {[required,maxLength50]}
//                 />
//                 <button
//                 // onClick={addMessage}
//                 >
//                     Добавить пост
//                 </button>
//             </div>
//         </form>
//     )
// }

// const AddMessageReduxForm = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm)

const DialogMessages = (props) => {

    const MessageItem = (props) => {
        return (
            <div className={classes.dialogs__message__item}>
                {props.message}
            </div>
        )
    }

    let renderMessages = props.messages.map((item, index) => <MessageItem key={index} message={item.message} />)

    const addMessageText = (values) => {
        debugger
        props.addMessage(values.addMessage)
    }

    return (
        <div className={classes.dialogs__message}>
            <div>
                {renderMessages}
            </div>
           {/* <AddMessageReduxForm onSubmit={addMessageText} />*/}
        </div>
    )


    //  let newMessageElement = React.createRef();
  
    {/*let onChangeText = () => {
        let textOfMessage = newMessageElement.current.value;
        //props.dispatch({type:"UPDATE-NEW-MESSAGE-TEXT", areatext:textOfMessage})
        props.updateNewMessageText(textOfMessage)
    }*/}
}

export default DialogMessages;