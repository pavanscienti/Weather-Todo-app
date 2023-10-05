import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <div style={{display:'flex',flexDirection:'row',width:"100%",backgroundColor:"whitesmoke",height:"10vh",justifyContent:'space-evenly',alignItems:'center'}}>
            <div>
            <Link style={{textDecoration:'none',fontFamily:'monospace',color:'ActiveBorder'}} to="/weather">Weather</Link>
            </div>
            <div>
            <Link style={{textDecoration:'none',fontFamily:'monospace',color:'ActiveBorder'}} to="todoapp">To do App</Link>
            </div>
        </div>
    )
}
export default Nav
