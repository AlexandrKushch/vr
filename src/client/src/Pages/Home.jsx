import React, { useContext, useEffect, useState } from "react";
import MessageService from "../API/MessageService";
import { useFetching } from "../components/hooks/useFetching";
import "../styles/chat.css"
import UserService from "../API/UserService";
import { CurrentUserContext, CurrentChatContext, StompClientContext, TokenContext } from "../context/context";
import ChatRoomService from "../API/ChatRoomService";
import FriendsDiv from "../components/FriendsDiv/FriendsDiv";
import Chat from "../components/Chat/Chat";
import "../components/UI/Burger/Burger.css";
import Burger from "../components/UI/Burger/Burger";

function Home() {
  const { stompClient } = useContext(StompClientContext)
  const { token } = useContext(TokenContext)

  const [isStompClientConnected, setIsStompClientConnected] = useState(false)
  const [isBurgerChecked, setIsBurgerChecked] = useState(false);

  const [messages, setMessages] = useState([])

  const [receivedMessage, setReceivedMessage] = useState(null)
  const [enrolledChat, setEnrolledChat] = useState(null)
  const [enrolledUser, setEnrolledUser] = useState(null)

  const [users, setUsers] = useState([])
  const [chats, setChats] = useState([])

  const { currentUserId } = useContext(CurrentUserContext);
  const { currentChatId } = useContext(CurrentChatContext);

  const [fetchMessages, , msgError] = useFetching(async () => {
    const messages = await MessageService.getByChatId(currentChatId, token);
    setMessages([...messages]);
  })

  const [fetchUsers, isUsersLoaded, userError] = useFetching(async () => {
    const users = await UserService.getAll(token);
    setUsers([...users]);
  })

  const [fetchChats, isChatsLoaded] = useFetching(async () => {
    const chats = await ChatRoomService.getAllByUserId(currentUserId, token);
    setChats(chats);

    chats.forEach(chat => {
      stompClient.subscribe("/user/" + chat.id + "/chat/messages", onMessageReceived);
    })
  })

  useEffect(() => {
    if (isStompClientConnected) {
      fetchUsers();
      fetchChats();
    }
  }, [isStompClientConnected])

  useEffect(() => {
    stompClient.connect({ Authentication: "Bearer_" + token }, onConnected, onError)
  }, [])

  useEffect(() => {
    if (currentChatId !== null) {
      fetchMessages();
    }
  }, [currentChatId])

  useEffect(() => {
    if (receivedMessage !== null) {
      if (currentChatId === receivedMessage.chatRoomMessages.id) {
        messages.push(receivedMessage)
        setMessages([...messages]);
        setReceivedMessage(null);
      }
    }
  }, [receivedMessage])

  useEffect(() => {
    if (enrolledUser !== null) {
      users.push(enrolledUser);
      setUsers([...users]);
      setEnrolledUser(null);
    }
  }, [enrolledUser])

  useEffect(() => {
    if (enrolledChat !== null) {
      chats.push(enrolledChat);
      stompClient.subscribe("/user/" + enrolledChat.id + "/chat/messages", onMessageReceived);
      setChats([...chats])
      setEnrolledChat(null);
    }
  }, [enrolledChat])

  const onConnected = () => {
    console.log("Connected!");
    setIsStompClientConnected(true);

    stompClient.subscribe("/user/" + currentUserId + "/chat/enroll_chat", onEnrolledChat);
    stompClient.subscribe("/chat/users", onEnrolledUser);
  }

  const onError = () => {
    console.log("Disconnected!");
  }

  const onMessageReceived = (payload) => {
    setReceivedMessage(JSON.parse(payload.body))
  }

  const onEnrolledChat = (payload) => {
    setEnrolledChat(JSON.parse(payload.body))
  }

  const onEnrolledUser = (payload) => {
    console.log(JSON.parse(payload.body));
    setEnrolledUser(JSON.parse(payload.body));
  }

  const sendMessage = (message) => {
    stompClient.send("/app/message", {}, JSON.stringify(message));
  }

  return (
    <div className="Home">
      {msgError && userError &&
        <h1>Something went wrong</h1>
      }

      {isUsersLoaded && isChatsLoaded
        ?
        <div>
          <Burger
            isChecked={isBurgerChecked}
            setIsChecked={setIsBurgerChecked}
          ></Burger>
          
          <div className="content">
            <FriendsDiv
              chats={chats}
              users={users}
              setIsBurgerChecked={setIsBurgerChecked}
            />
            <Chat
              messages={messages}
              users={users}
              sendMessage={sendMessage}
            />
          </div>
        </div>
        :
        <h1>Loading...</h1>
      }
    </div>
  );
}

export default Home;
