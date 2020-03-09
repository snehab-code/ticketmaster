import React from 'react'
import axios from '../../config/axios'


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
        axios.post('http://localhost:3030/users/login', formData)
            .then(response => {
                if(response.data.notice) {
                    alert(response.data.notice)
                } else {
                    const token = response.data
                    localStorage.setItem('authToken', token)
                    this.props.history.push('/')
                    window.location.reload()
                }
            })
            .catch(err => alert(err))
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


export default Login