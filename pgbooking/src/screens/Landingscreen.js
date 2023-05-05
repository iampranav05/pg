import React from 'react'
import { Link } from 'react-router-dom'

function Landingscreen() {
  return (
    <div className='row landing justify-content-center'>

        <div className='col-md-9 my-auto text-center' style={{borderRight:'8px solid white'}}>
            <h2 style={{color:'white', fontSize:'130px'}}>HomeStayX</h2>
            <h1 style={{color:'white'}}>"Experience the comfort of home away from home"</h1>

            <Link to='/home'>
            <button className='btn landingbtn'>Get started</button>

            </Link>

        </div>

    </div>
  )
}

export default Landingscreen