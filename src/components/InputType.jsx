import React from 'react'

const InputType = ({types, names, values, styles, classNames, placeholders, functions}) => {

  return (
    <input type={types} name={names} placeholder={placeholders} onChange={functions} style={styles} className={classNames} value={values} />
  )
}

export default InputType