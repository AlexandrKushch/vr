import React from 'react'
import "./Burger.css"

const Burger = ({ isChecked, setIsChecked }) => {
    return (
        <>
            <input
                id="menu__toggle"
                type="checkbox"
                checked={isChecked}
                onChange={e => { setIsChecked(!isChecked) }}
            />
            <label
                className="menu__btn"
                htmlFor="menu__toggle"
            >
                <span></span>
            </label>
        </>
    )
}

export default Burger