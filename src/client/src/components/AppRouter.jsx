import React, { useContext, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CurrentUserContext, StompClientContext } from '../context/context';
import { privateRoutes, publicRoutes } from "./router/router"
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

const AppRouter = () => {
    const { currentUserId } = useContext(CurrentUserContext);
    const { setStompClient } = useContext(StompClientContext)

    useEffect(() => {
        const sock = new SockJS("http://localhost:8080/ws");
        setStompClient(Stomp.over(sock));
    }, [currentUserId])

    return (
        currentUserId
            ?
            <Routes>
                {privateRoutes.map((route, index) =>
                    <Route
                        key={index}
                        path={route.path}
                        element={route.element}
                    />
                )}

                <Route path="*" element={<Navigate to="/z" replace />} />
            </Routes>
            :
            <Routes>
                {publicRoutes.map((route, index) =>
                    <Route
                        key={index}
                        path={route.path}
                        element={route.element}
                    />
                )}

                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
    )
}

export default AppRouter