import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {startDeleteTicket, startPutTicket} from '../../actions/tickets'

function TicketList(props){

    const handleDelete = (id) => {
        props.dispatch(startDeleteTicket(id))
    }

    const handleResolved = (ticket) => {
        const formData = {
            isResolved: !ticket.isResolved
        }
        props.dispatch(startPutTicket(ticket._id, formData))
    }

    return (
        <div className="col-md-12 text-center">
            <h2>Ticket List</h2>
            <Link to="/tickets/new"><button type="button" className="btn btn-primary mt-2 mb-3">Add ticket</button></Link>
            <table className="table border">
                <thead>
                <tr>
                    <th>Code</th>
                    <th>Department</th>
                    <th>Employee</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
            {
                props.tickets.map(ticket => {
                    return (
                        <tr key={ticket._id}>
                        <td className="align-middle"><Link to ={`/tickets/${ticket._id}`}>{ticket.code}</Link></td>
                        <td className="align-middle">{ticket.department.name}</td> 
                        <td className="align-middle">{ticket.employees.map(emp => {
                            return emp.name + ','
                        })}</td>
                        <td className="align-middle">{ticket.customer.name}</td>
                        <td className="align-middle">{ticket.isResolved ? <button className="btn text-success" onClick={() => {handleResolved(ticket)}}>Resolved</button> : <button className="btn text-warning" onClick={() => {handleResolved(ticket)}}>Pending</button> }</td>
                        <td className="align-middle">{ticket.priority}</td>
                        <td className="d-flex justify-content-around"><Link className="btn btn-primary" to={`/tickets/edit/${ticket._id}`}>edit</Link>
                        <button className="btn btn-danger" onClick={() => {handleDelete(ticket._id)}}>Remove</button>
                        </td>
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
        tickets: state.tickets
    }
}

export default connect(mapStateToProps)(TicketList)