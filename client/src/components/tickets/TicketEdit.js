import React from 'react'
import TicketForm from './TicketForm'
import {connect} from 'react-redux'
import {idSelector} from '../../store/configureStore'
import {startPutTicket} from '../../actions/tickets'

function TicketEdit(props){

    console.log('ticket props', props)

    const handleSubmit = (formData) => {
        const id = props.match.params.id
        props.dispatch(startPutTicket(id,formData, props.history))
    }

    return (
        <div>
            <h2>Edit Ticket</h2>
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