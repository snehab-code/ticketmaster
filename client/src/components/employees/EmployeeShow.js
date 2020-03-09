import React from 'react'
import {connect} from 'react-redux'
import {idSelector} from '../../store/configureStore'
import {ticketSelector} from '../../reducers/ticketsReducer'

function EmployeeShow(props) {
    return( 
        <div className="col-12">
        <div className="bg-light p-3 text-center">
            <h1>{ props.employee && props.employee.name}</h1>
            {
                props.employee && 
                    <>email: {props.employee.email}
                    <br/>
                    phone: {props.employee.mobile}
                    </>
                      
            }
        </div>
        <div className="list-group text-center">
            {
                props.tickets[0] ? 
                props.tickets.map(ticket => {
                    return (
                        <button type="button" class="list-group-item list-group-item-action">Dapibus ac facilisis in</button>
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
        employee: idSelector(state.employees, props.match.params.id),
        tickets: ticketSelector(state.tickets, {type:'CUSTOMER', payload: props.match.params.id})
    }
}

export default connect(mapStateToProps)(EmployeeShow)