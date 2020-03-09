import React from 'react'
import {connect} from 'react-redux'
import {idSelector} from '../../store/configureStore'
import {ticketSelector} from '../../reducers/ticketsReducer'

function DepartmentShow(props) {
    console.log(props)
    return( 
        <div className="col-12">
        <div className="p-2 bg-light text-center">
            <h1>{ props.department && props.department.name}</h1>
        </div>
        <div className="list-group text-center">
            {
                props.tickets[0] ? 
                props.tickets.map(ticket => {
                    return (
                        <button type="button" class="list-group-item list-group-item-action">{
                            ticket.code
                        }</button>
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
        department: idSelector(state.departments, props.match.params.id),
        tickets: ticketSelector(state.tickets, {type:'CUSTOMER', payload: props.match.params.id})
    }
}

export default connect(mapStateToProps)(DepartmentShow)