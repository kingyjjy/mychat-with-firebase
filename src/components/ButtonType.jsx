import React from 'react'

const ButtonType = ({types, functions, styles, text, classNames}) => {
  return (
    <button type={types} style={styles} className={classNames} onClick={functions}>{text}</button>
  )
}

export default ButtonType