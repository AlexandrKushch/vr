import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import RegisterService from '../API/RegisterService';
import Button from '../components/UI/Button/Button'
import Input from '../components/UI/Input/Input'
import { StompClientContext } from '../context/context';
import "../styles/form.css"

const Register = () => {
    const [user, setUser] = useState({ username: '', password: '' });
    const [isUserExist, setIsUserExist] = useState(false);
    const [messageError, setMessageError] = useState('');

    const { stompClient } = useContext(StompClientContext)
    const navigate = useNavigate();

    const registrate = async (e) => {
        e.preventDefault();

        if (user.username !== '' && user.username !== null) {
            if (user.password !== '' && user.password !== null) {
                try {
                    const [userFromDb, status] = await RegisterService.putOne(user);
                    console.log("User has Registrated")

                    if (status === 200) {
                        stompClient.send("/app/users", {}, JSON.stringify(userFromDb))
                        navigate("/login")
                    }
                } catch (err) {
                    console.log(err);
                    setMessageError("User already exist")
                    setIsUserExist(true);
                }
            } else {
                setMessageError("Password is not correct")
                setIsUserExist(true);
            }
        } else {
            setMessageError("Username is not correct")
            setIsUserExist(true);
        }
    }

    return (
        <form className="container">
            <h1>Registration</h1>
            {isUserExist &&
                <h3 style={{ color: "red" }}>{messageError}</h3>
            }
            <Input
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="Username"
            ></Input>
            <Input
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
            ></Input>
            <div>
                <Button onClick={registrate}>Registrate</Button>
            </div>
        </form>
    )
}

export default Register