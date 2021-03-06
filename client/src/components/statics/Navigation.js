import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {logoutUser} from '../../actions/user'

class Navigation extends React.Component {

  constructor() {
    super()
    this.state = {
      toggleActive: false
    }
  }

  componentDidMount() {
    console.log(this.props)
    this.props.user.isLoggedIn === false && this.props.history.push('/account/login')
  }

  handleLogout = () => {
    localStorage.removeItem('authToken')
    this.props.dispatch(logoutUser())
    this.props.history.push('/account/login')
  }

  handleToggle = () => {
    this.setState((prevState) => {return {toggleActive: !prevState.toggleActive}})
  }

  render() {
    return (
        <>
        <nav className="navbar navbar-expand-md navbar-dark bg-primary">
            <a className ="navbar-brand" href="/">Ticket Master</a>
            <button className="navbar-toggler" type="button" onClick={this.handleToggle}>
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className={!this.state.toggleActive ? "collapse navbar-collapse" : "collapse navbar-collapse show"}>
                {
                  !this.props.user.isLoggedIn ? 
                <div className="navbar-nav bd-navbar-nav">
                  <Link className="nav-item nav-link"  to="/account/login">Login</Link>
                  <Link className="nav-item nav-link"  to="/account/register">Register</Link>
                </div>
                  : 
                <div className="navbar-nav bd-navbar-nav">
                  <Link className="nav-item nav-link active" to="/">Home </Link>
                  <Link className="nav-item nav-link" to="/customers"> Customers </Link>
                  <Link className="nav-item nav-link" to="/departments"> Departments </Link>
                  <Link className="nav-item nav-link" to="/employees"> Employees </Link>
                  <Link className="nav-item nav-link" to="/tickets"> Tickets </Link>
                  <Link className="nav-item nav-link" to="#" onClick={this.handleLogout}>Logout</Link>
                </div>
                }
            </div>
        </nav>
        </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps)(Navigation))