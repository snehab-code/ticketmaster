import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class CustomerList extends React.Component {

    constructor(){
        super()
        this.state = {
            customers: []
        }
    }

    componentDidMount(){
        // the token will be sent to the server in the request header. The second argument for get is the options object which has a property called headers, in which you pass x-auth
        // you can send it the url, but the backend has been designed in a way that requires you to pass it in the request HEADER. This is to keep it from being exposed
        // so when you're trying to get private info this is how you do it. The server will fetch the data based on the token and send it to you.
        axios.get('/customers', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const customers = response.data
                this.setState({customers})
            })
    }

    handleDelete = (customerId) => {
        axios.delete(`/customers/${customerId}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            this.setState(prevState => {
                const customers = prevState.customers.filter(cust => cust._id !== response.data._id)
                return ({customers})
            })
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className="col-md-8">
                <h2>Customers List - {this.state.customers.length}</h2>
                <Link to="/customers/new">Add customer</Link>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                {
                    this.state.customers.map(customer => {
                        return (
                            <tr key={customer._id}>
                            <td><Link to ={`/customers/${customer._id}`}>{customer.name}</Link></td>
                            <td>{customer.mobile}</td> 
                            <td>{customer.email}</td>
                            <td><Link className="btn btn-primary" to={`/customers/edit/${customer._id}`}>edit</Link></td>
                            <td><button className="btn btn-danger" onClick={() => {this.handleDelete(customer._id)}}>Remove</button></td>
                            </tr>
                        )
                    })
                }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CustomerList