import React from 'react'
import {connect} from 'react-redux'
import {startUserLogin} from '../../actions/user'

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.dispatch(startUserLogin(formData, this.props.history))
    }

    render() {
        return (
            <div>
                <h2> Login with us </h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email">email</label>
                    <input type="text" value={this.state.email} onChange={this.handleChange} id="email" />
                    <br/>
                    <label htmlFor="password">password</label>
                    <input type="password" value={this.state.password} onChange={this.handleChange} id="password" />
                    <br/>
                    <input type="submit" />
                </form>
            </div>
        )
    }
}


export default connect()(Login)