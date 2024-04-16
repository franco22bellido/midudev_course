import { useState } from "react"
const Toggable = ({children, buttonLabel}) => {

  const [visible, setVisible] = useState(false)

  
  const hideWhenVisible = {display: visible ? 'none' : ''}
  const showWhenVisible = {display: visible ? '' : 'none'}
  return (
    <div>
        <div style={hideWhenVisible}>
            <button onClick={()=> setVisible(true)}>{buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
            <button onClick={()=> setVisible(false)}>cancel</button>
            {children}
        </div>
    </div>
  )
}

export default Toggable
