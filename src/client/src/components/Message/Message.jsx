import React, { useContext } from 'react'
import { CurrentUserContext } from '../../context/context';
import cl from "./Message.module.css"

const Message = ({message, username}) => {
  const {currentUserId} = useContext(CurrentUserContext);

    const isRight = currentUserId === message.sender.id ? cl.contentRight : ""
    const rootClasses = [cl.message];

    if (isRight) {
        rootClasses.push(cl.messageRight);
    }

  return (
    <div className={rootClasses.join(' ')}>
        <h3 className={isRight}> {username}</h3>
        <p className={isRight}> {message.content}</p>
    </div>
  )
}

export default Message