import React, { useContext, useEffect, useState } from 'react'
import ChatRoomService from '../../../API/ChatRoomService'
import UserService from '../../../API/UserService'
import { CurrentUserContext, StompClientContext, TokenContext } from '../../../context/context'
import "../FriendsDiv.css"

const FindAFriendList = ({ users, selectChat}) => {
    const { currentUserId } = useContext(CurrentUserContext)
    const { stompClient } = useContext(StompClientContext)
    const { token } = useContext(TokenContext)

    const [isCreating, setIsCreating] = useState(false)
    const [chat, setChat] = useState(null)
    const [user, setUser] = useState(null)

    const createChat = async (user) => {
        const response = await ChatRoomService.isChatExist(user.id, currentUserId, token);

        if (response.data.id !== null) {
            selectChat(response.data)
        } else {
            try {
                setIsCreating(true)
                
                const chat = await ChatRoomService.createChat(token);
                await UserService.addUserIntoChat(user.id, chat, token);
                await UserService.addUserIntoChat(currentUserId, chat, token);

                setChat(chat)
                setUser(user)
            } catch (e) {
                console.log(e.message);
            } finally {
                setIsCreating(false)
            }
        }
    }

    useEffect(() => {
        if (chat !== null) {
            if (isCreating === false) {
               console.log(chat);
               console.log(isCreating)

                const data = chat.id + ":" + user.id + ":" + currentUserId;
                stompClient.send("/app/chats", {}, data);
                selectChat(chat)
            }
        }
    }, [chat, isCreating])

    return (
        <div>
            {users.length === 1 &&
                <h1>List of users is empty</h1>
            }
            {users.map(user =>
                <div
                    key={user.id}
                >
                    {currentUserId !== user.id &&
                        <div
                            className="friendContent"
                            onClick={() => createChat(user)}
                        >
                            <p>{user.username}</p>
                        </div>
                    }
                </div>
            )}
        </div>
    )
}

export default FindAFriendList