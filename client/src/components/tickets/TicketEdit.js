import React from 'react'
import TicketForm from './TicketForm'
import {connect} from 'react-redux'
import {idSelector} from '../../store/configureStore'
import {startPutTicket} from '../../actions/tickets'

function TicketEdit(props){

    const handleSubmit = (formData) => {
        const id = props.match.params.id
        props.dispatch(startPutTicket(id,formData, props.history))
    }

    return (
        <div className="col-md-6 border rounded">
                <h1 className="text-center">Edit Ticket</h1>
            {props.ticket && props.ticket._id && <TicketForm handleSubmit = {handleSubmit} {...props.ticket} /> }
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        ticket: idSelector(state.tickets, props.match.params.id)
    }
}

export default connect(mapStateToProps)(TicketEdit)