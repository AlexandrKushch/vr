import React from 'react'
import cl from "./Input.module.css"

const Input = (props) => {
  return (
    <input {...props} className={cl.input}>
        
    </input>
  )
}

export default Input