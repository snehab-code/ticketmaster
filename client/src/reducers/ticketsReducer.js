const ticketsReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_TICKETS' : {
            return [...action.payload]
        }
        case 'ADD_TICKET': {
            return [...state, action.payload]
        }
        case 'REMOVE_TICKET': {
            return state.filter(ticket => ticket._id !== action.payload)
        }
        case 'UPDATE_TICKET': {
            return state.map(ticket => {
                if (ticket._id === action.payload.id) {
                    return {...ticket, ...action.payload.ticket}
                } else {
                    return {...ticket}
                }
            })
        }
        case 'LOGOUT': {
            return []
        }
        default: {
            return state
        }
    }
}

// selector function
export const ticketSelector = (state, selector) => {
    switch(selector.type) {
        case 'RESOLVED': {
            return state.filter(ticket=> ticket.isResolved)
        }
        case 'PENDING': {
            return state.filter(ticket => !ticket.isResolved)
        }
        case 'PRIORITY': {
            return state.filter(ticket => ticket.priority == selector.payload)
        }
        case 'DEPARTMENT': {
            return state.filter(ticket => ticket.department == selector.payload)
        }
        case 'EMPLOYEE': {
            return state.filter(ticket => ticket.employee == selector.payload)
        }
        case 'CUSTOMER': {
            return state.filter(ticket => ticket.customer._id == selector.payload)
        }
    }
}

export default ticketsReducer

