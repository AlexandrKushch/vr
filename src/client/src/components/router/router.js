import Home from "../../Pages/Home";
import Login from "../../Pages/Login";
import Register from "../../Pages/Register";

export const privateRoutes = [
    {path: "/z", element: <Home />, exact: true},
    {path: "/z/:id", element: <Home />, exact: true}
]

export const publicRoutes = [
    {path: "/login", element: <Login />, exact: true},
    {path: "/register", element: <Register />, exact: true}
]
