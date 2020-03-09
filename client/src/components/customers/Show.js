import React from 'react'
import {connect} from 'react-redux'
import {idSelector} from '../../store/configureStore'
import {ticketSelector} from '../../reducers/ticketsReducer'

function CustomerShow(props) {
    const redirect = (id) => {
        props.history.push(`/tickets/${id}`)
    }

    return( 
        <div className="col-md-12">
        <div className="jumbotron text-center">
            <h1>{ props.customer && props.customer.name}</h1>
            {
                props.customer && 
                    <>email: {props.customer.email}
                    <br/>
                    phone: {props.customer.mobile}
                    </>
                      
            }
        </div>
        <div className="list-group text-center">
            {
                props.tickets[0] ? 
                props.tickets.map(ticket => {
                    return (
                        <button key={ticket._id} onClick={() => redirect(ticket._id)} type="button" class="list-group-item list-group-item-action">
                            {ticket.code} - {ticket.isResolved ? "Resolved" : "Pending"}
                        </button>
                    )
                })
                :
                'No tickets yet'
            }
        </div>
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        customer: idSelector(state.customers, props.match.params.id),
        tickets: ticketSelector(state.tickets, {type:'CUSTOMER', payload: props.match.params.id})
    }
}

export default connect(mapStateToProps)(CustomerShow)