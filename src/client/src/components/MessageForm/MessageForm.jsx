import React, { useContext, useState } from 'react'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import { CurrentUserContext, CurrentChatContext, TokenContext } from '../../context/context';
import MessageService from "../../API/MessageService";
import cl from "./MessageForm.module.css"

const Form = ({callback, ...props}) => {
    
    const {currentUserId} = useContext(CurrentUserContext);
    const {currentChatId} = useContext(CurrentChatContext);
    const {token} = useContext(TokenContext)
    const [message, setMessage] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();

        const msg = {
            content: message
        };
    
        const msgFromDb = await MessageService.putMessage(currentChatId, currentUserId, msg, token);
        callback(msgFromDb);

        setMessage('');
    }

  return (
    <form {...props} className={cl.messageForm}>
        <Input 
            value={message}
            onChange={e => setMessage(e.target.value)}
            type="text"
        ></Input>
        <Button
            style={{marginLeft: "15px"}} 
            value={message}
            onClick={sendMessage}
        >Send</Button>
    </form>
  )
}

export default Form