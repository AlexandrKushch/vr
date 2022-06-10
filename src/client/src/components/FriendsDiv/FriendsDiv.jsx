import React, { useContext, useEffect, useState } from 'react'
import "./FriendsDiv.css"
import { useNavigate } from 'react-router-dom'
import { CurrentChatContext, CurrentUserContext, TokenContext } from '../../context/context';
import Button from '../UI/Button/Button';
import FindAFriendList from './FriendsComponent/FindAFriendList';
import FriendsList from './FriendsComponent/FriendsList';
import { useFetching } from '../hooks/useFetching';
import ChatRoomService from '../../API/ChatRoomService';

const FriendsDiv = ({ chats, users, setIsBurgerChecked }) => {
    const router = useNavigate();

    const { token } = useContext(TokenContext);

    const { setCurrentChatId } = useContext(CurrentChatContext)
    const { currentUserId } = useContext(CurrentUserContext)

    const [isUsersShown, setIsUsersShown] = useState(false)

    const [friendNames, setFriendNames] = useState([])

    const [fetchFriends, isLoaded] = useFetching(async () => {
        const friends = await ChatRoomService.getAllFriendsByUserId(currentUserId, token);
        setFriendNames(friends);
    })

    useEffect(() => {
        fetchFriends();
    }, [chats])

    const selectChat = (chat) => {
        setIsUsersShown(false);
        setCurrentChatId(chat.id);
        router("/z/" + chat.id)
        setIsBurgerChecked(false);
    }

    return (
        <div className="friendList">
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button style={{ width: "100%" }} onClick={() => setIsUsersShown(!isUsersShown)}>
                    {isUsersShown
                        ? "Show chats"
                        : "Find a Friend"
                    }
                </Button>
            </div>

            {isUsersShown
                ?
                <FindAFriendList users={users} selectChat={selectChat}></FindAFriendList>
                :
                <div>
                    {isLoaded
                        ?
                        <>
                            {friendNames.length === 0 
                            ?
                            <h1>Find a friend to create chat</h1>
                            :
                            <FriendsList friendNames={friendNames} chats={chats} callback={selectChat}></FriendsList>  
                            }
                        </>
                        :
                        <h1>Friends is loading</h1>
                    }
                </div>
            }
        </div>
    )
}

export default FriendsDiv