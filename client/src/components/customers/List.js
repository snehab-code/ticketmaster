import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {startDeleteCustomer} from '../../actions/customers'

function CustomerList(props){

    const handleDelete = (customerId) => {
        props.dispatch(startDeleteCustomer(customerId))
    }

    return (
        <div className="col-md-12 text-center">
            <h2>Customer List</h2>
            <Link to="/customers/new"><button type="button" className="btn btn-primary" style={{margin:20}}>Add customer</button></Link>
            <table className="table border">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
            {
                props.customers.map(customer => {
                    return (
                        <tr key={customer._id}>
                        <td><Link to ={`/customers/${customer._id}`}>{customer.name}</Link></td>
                        <td>{customer.mobile}</td> 
                        <td>{customer.email}</td>
                        <td className="d-flex justify-content-around"><Link className="btn btn-primary" to={`/customers/edit/${customer._id}`}>edit</Link>
                        <button className="btn btn-danger" onClick={() => {handleDelete(customer._id)}}>Remove</button></td>
                        </tr>
                    )
                })
            }
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        customers: state.customers
    }
}

export default connect(mapStateToProps)(CustomerList)