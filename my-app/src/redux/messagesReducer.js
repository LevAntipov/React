const ADD_MESSAGE = "ADD-MESSAGE";

let initialState = {
    dialogsData: [
        { id: 1, name: 'Leva', avatar: 'https://zoographia.ru/upload/iblock/af2/17afy2pp1f6cqh1vu6z9q2oi5bxy0li5.jpg', },
        { id: 2, name: 'Vanya', avatar: 'https://blog.okko.tv/thumb/1420x0/filters:quality(75):no_upscale()/imgs/2023/07/06/17/5976722/b7c66c53a71db1bd07f1a94c100d24e06c700ef3.webp', },
        { id: 3, name: 'Boris', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzWFzDp55478PcJs7JyOW7ACDY4jndrIIo2Q&s', },
        { id: 4, name: 'Sasha', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUFkYT274W_wxuAdE5YXSHS3kn53axaJZXAA&s' },
        { id: 5, name: 'Artem', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi0H_B1tfjkAapdAdeQTXP0Gxfa5-vXHp6Eg&s' },
    ],
    messagesData: [
        { id: 1, message: "Hi" },
        { id: 2, message: "How are you" },
        { id: 3, message: "You'r looking good" },
    ],
}

const messagesReducer = (state = initialState, action) => {

    switch (action.type) {
        case (ADD_MESSAGE):
            /*          Чтоюы не создавать новые переменные (stateCopy), можно сразу возвращать объект
                        {
                            //Можно так копировать, можно как в profileReducer
                            let stateCopy = {
                                ...state,
                                messagesData: [...state.messagesData, { id: 4, message: state.newMessageText }],
                                newMessageText: "",
                            }
            
                            return stateCopy;
                        }
            */
            return ({
                ...state,
                messagesData: [...state.messagesData, { id: 4, message: action.message }],
            })

        /* Используется для сохранения главной стратегии flux->redax, а именно -
         - UI не может меняться без изменения BLL(state), соответсвенно -
         - при каждом вписанном в textarea символе происходит изменения state, а затем рендер.
         */
        default:
            return state;
    }

}

export const addMessageActionCreator = (message) => {
    return {
        type: ADD_MESSAGE,
        message
    }
}

export default messagesReducer;