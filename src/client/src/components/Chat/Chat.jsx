import React, { useContext } from 'react'
import { CurrentChatContext } from '../../context/context'
import Form from '../MessageForm/MessageForm'
import MessagesList from '../MessageList/MessagesList'
import "./Chat.css"

const Chat = ({ messages, users, sendMessage }) => {
    const { currentChatId } = useContext(CurrentChatContext)

    return (
        <div className="chat">
            <MessagesList
                messages={messages}
                users={users}
            >
                {currentChatId === null &&
                    <h1>Select Chat</h1>
                }
            </MessagesList>

            {currentChatId &&
                <Form
                    callback={sendMessage}
                ></Form>
            }
        </div>
    )
}

export default Chat