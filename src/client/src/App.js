import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { CurrentUserContext, CurrentChatContext, StompClientContext, TokenContext } from "./context/context";

const App = () => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [stompClient, setStompClient] = useState(null)
  const [currentChatId, setCurrentChatId] = useState(null)
  const [token, setToken] = useState(null)


  return (
    <CurrentUserContext.Provider
      value={{currentUserId, setCurrentUserId}}
    >
      <StompClientContext.Provider
        value={{stompClient, setStompClient}}
      >
        <CurrentChatContext.Provider
          value={{currentChatId, setCurrentChatId}}
        >
          <TokenContext.Provider
            value={{token, setToken}}
          >
            <BrowserRouter>
              <AppRouter />
            </BrowserRouter>
          </TokenContext.Provider>
        </CurrentChatContext.Provider>
      </StompClientContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
