import React from 'react'

const Button = ({onClickHandler, value, title}) => {

  return (
    <div onClick={onClickHandler} value={value} className={`px-4 py-1 border text-base hover:bg-blue hover:text-white`}>
        {title}
    </div>
  )
}

export default Button