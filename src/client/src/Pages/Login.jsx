import React, { useContext, useState } from 'react'
import Button from '../components/UI/Button/Button'
import Input from '../components/UI/Input/Input'
import { CurrentUserContext, TokenContext } from '../context/context'
import { Link } from 'react-router-dom'
import LoginService from '../API/LoginService'
import "../styles/form.css"

const Login = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [isNotCorrect, setIsNotCorrect] = useState(false)

  const { currentUserId, setCurrentUserId } = useContext(CurrentUserContext);
  const { setToken } = useContext(TokenContext);

  async function signIn(e) {
    e.preventDefault();

    try {
      const response = await LoginService.login(user);

      if (response.status === 200) {
        setToken(response.data.token);
        const id = response.data.id;
        setCurrentUserId(id);
      }
    } catch (err) {
      console.log(err);
      setIsNotCorrect(true);
    }
  }

  return (
    <form className="container">
      <h1>Login</h1>
      {isNotCorrect &&
        <h3 style={{color: "red"}}>Username or Password is not correct</h3>
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
        <Button onClick={signIn}>Sign In</Button>
        <Link to="/register"><Button style={{ float: "right" }}>Register</Button></Link>
      </div>
    </form>
  )
}

export default Login