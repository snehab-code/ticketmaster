// this is the folder where your header etc should be!
import React from 'react'

import {Link} from 'react-router-dom'

function Navigation(props) {
  console.log(localStorage.getItem('authToken'))
    const handleLogout = () => {
        localStorage.removeItem('authToken')
        window.location.href = '/account/login'
      }

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className ="navbar-brand" href="/">Ticket Master</a>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                {
                  !localStorage.getItem('authToken') ? 
                <>
                  <Link className="nav-item nav-link"  to="/account/login">Login</Link>
                  <Link className="nav-item nav-link"  to="/account/register">Register</Link>
                </>
                  : 
                <>
                  <Link className="nav-item nav-link active" to="/">Home </Link>
                  <Link className="nav-item nav-link" to="/customers"> Customers </Link>
                  <Link className="nav-item nav-link" to="/departments"> Departments </Link>
                  <Link className="nav-item nav-link" to="/employees"> Employees </Link>
                  <Link className="nav-item nav-link" to="/tickets"> Tickets </Link>
                  <Link className="nav-item nav-link" to="#" onClick={handleLogout}>Logout</Link>
                </>
                }
                </div>
            
            </div>
          
        {/* // } */}
        </nav>
        </>
    )
}

export default Navigation