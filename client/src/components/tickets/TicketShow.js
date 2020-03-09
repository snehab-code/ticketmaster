import React from 'react'
import {connect} from 'react-redux'
import {idSelector} from '../../store/configureStore'
import {startPutTicket} from '../../actions/tickets'

function TicketShow(props) {
    const changeStatus = () => {
        const formData = {
            isResolved: !props.ticket.isResolved
        }
        props.dispatch(startPutTicket(props.match.params.id, formData))
    }

    return( 
        <div className="jumbotron col-md-6 text-center">
            <h1>{ props.ticket && props.ticket.code}</h1>
            {
                props.ticket && 

                    <div>
                        <h2>{props.ticket.isResolved ? <span className="text-success">Resolved</span> : <span className="text-warning">Pending</span> }</h2>
                    {props.ticket.message}
                    <br/>
                    <strong>Customer - </strong>
                    {props.ticket.customer.name}
                    <br/>
                    <strong>Department - </strong> 
                    {props.ticket.department.name}
                    <br/>
                    <strong>Employees - </strong>
                    {
                        props.ticket.employees && props.ticket.employees.map(emp => {
                            return (
                                <>
                                <span key={emp._id}>emp.name, </span>
                                </>
                            )
                        })
                    }
                    <br/>
                    {
                        !props.ticket.isResolved ? 
                            <button onClick={changeStatus} className="btn m-3">Mark Resolved</button>
                        :
                            <button onClick={changeStatus} className="btn m-3">Mark Pending</button>
                    }
                    
                    </div>   
            }
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        ticket: idSelector(state.tickets, props.match.params.id)
    }
}

export default connect(mapStateToProps)(TicketShow)