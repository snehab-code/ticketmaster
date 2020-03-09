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
        <nav className="navbar navbar-expand-md navbar-dark bg-primary d-flex">
            <a className ="navbar-brand" href="/">Ticket Master</a>
            <div className="navbar-scroll col-12" id="navbarNavAltMarkup">
                <div className="navbar-nav bd-navbar-nav flex-row">
                {
                  !localStorage.getItem('authToken') ? 
                <>
                  <Link className="nav-item nav-link"  to="/account/login">Login</Link>
                  <Link className="nav-item nav-link"  to="/account/register">Register</Link>
                </>
                  : 
                <>
                  <div className="navbar-nav bd-navbar-nav flex-row col-9">
                  <Link className="nav-item nav-link active" to="/">Home </Link>
                  <Link className="nav-item nav-link" to="/customers"> Customers </Link>
                  <Link className="nav-item nav-link" to="/departments"> Departments </Link>
                  <Link className="nav-item nav-link" to="/employees"> Employees </Link>
                  <Link className="nav-item nav-link" to="/tickets"> Tickets </Link>
                  </div>
                  <div className="col-3">
                  <Link className="nav-item nav-link" to="#" onClick={handleLogout}>Logout</Link>
                  </div>
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