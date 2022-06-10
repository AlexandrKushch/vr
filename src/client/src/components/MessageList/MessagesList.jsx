import React, { useRef, useEffect } from 'react'
import Message from '../Message/Message'
import cl from "./MessagesList.module.css"

const MessagesList = ({messages, users, children}) => {
    const messageEndRef = useRef(null);

    const scrollToBottom = () => {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  
    useEffect(() => {
      scrollToBottom()
    }, [messages]);

  return (
    <div>
      <div className={cl.messagesList}>
        {children}
        {messages.map((message, index) => {
            return (
                <Message
                    key={message.id}
                    message={message}
                    username={users.find(user => user.id === message.sender.id).username}
                />
            )
        })}
        <div ref={messageEndRef}></div>
      </div>
    </div>
  )
}

export default MessagesList