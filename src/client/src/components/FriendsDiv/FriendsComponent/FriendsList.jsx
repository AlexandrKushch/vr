import React, { useContext } from 'react'
import { CurrentChatContext } from '../../../context/context'
import "../FriendsDiv.css"

const FriendsList = ({ friendNames, chats, callback }) => {
    const { currentChatId } = useContext(CurrentChatContext)

    return (
        <div>
            {chats.map((chat) =>
                <div
                    onClick={() => callback(chat)}
                    className={chat.id === currentChatId ? "friendContent currentFriend" : "friendContent"}
                    key={chat.id}
                >
                    {friendNames.map((friends, index) =>
                        <div key={index}>
                            {friends.map(member =>
                                <div key={member.id}>
                                    {member.chatRoomsOfUser.map(room => 
                                        <div key={room.id}>
                                            {room.id === chat.id &&
                                                <p>{member.username}</p>
                                            }  
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default FriendsList