import React from 'react'
import TicketForm from './TicketForm'
import {connect} from 'react-redux'
import {startPostTicket} from '../../actions/tickets'

function TicketNew(props){

    const handleSubmit = (formData) => {
        props.dispatch(startPostTicket(formData, props.history))
    }

    return (
            <div className="col-md-6 border">
                <h1 className="text-center">Add a ticket</h1>
                <TicketForm handleSubmit={handleSubmit} />
            </div>
        )
}

export default connect()(TicketNew)