import { useEffect, useState } from "react"
const Toggable = ({children}) => {

  const [showChildren, setShowChildren, ] = useState(false)
  const [display, setDisplay] = useState({})

  const handleShowChildren = ()=> {
    setShowChildren((show)=> !show)
  }

  const showDisplay = ()=>{
    if(showChildren){
        setDisplay({display: 'block'})
    }else{
        setDisplay({display: 'none'})
    }
  }
  useEffect(()=> {
    showDisplay()
  }, [showChildren])
  return (
    <div>
        <div style={display}>
            {children}
        </div>
      <button onClick={()=> handleShowChildren()}>{showChildren ? 'ocultar' : 'mostrar'}</button>
    </div>
  )
}

export default Toggable
