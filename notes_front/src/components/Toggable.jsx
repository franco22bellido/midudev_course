import { useState } from "react"
const Toggable = ({children}) => {

  const [visible, setVisible] = useState(false)

  
  const hideWhenVisible = {display: visible ? 'none' : ''}
  const showWhenVisible = {display: visible ? '' : 'none'}
  return (
    <div>
        <div style={hideWhenVisible}>
            <button onClick={()=> setVisible(true)}>Show children</button>
        </div>
        <div style={showWhenVisible}>
            <button onClick={()=> setVisible(false)}>hide children</button>
            {children}
        </div>
    </div>
  )
}

export default Toggable
