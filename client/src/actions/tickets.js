import axios from '../config/axios'
import Swal from 'sweetalert2'

const setTickets = (tickets) => {
    return {type: 'SET_TICKETS', payload: tickets}
}

const addTicket = (ticket) => {
    return {type: 'ADD_TICKET', payload: ticket}
}

const updateTicket = (id, ticket) => {
    return {type: 'UPDATE_TICKET', payload: {id, ticket}}
}

const removeTicket = (id) => {
    return {type: 'REMOVE_TICKET', payload: id}
}

export const startGetTickets = () => {
    return (dispatch) => {
        axios.get('/tickets')
            .then(response => {
                const tickets = response.data
                dispatch(setTickets(tickets))
            })
            .catch(err => {
                if (err.response.status == 401) {
                    dispatch({type: 'LOGOUT'})
                }
            })
    }
}

export const startPostTicket = (formData, history) => {
    return (dispatch, getState) => {
        axios.post('/tickets', formData)
            .then(response => {
                if (response.data.errors) {
                    Swal.fire({
                        icon: 'error',
                        text: response.data.message,
                    })
                } else {
                    const ticket = response.data
                    ticket.department = getState().departments.find(dept => dept._id == ticket.department)
                    ticket.customer = getState().customers.find(customer => customer._id == ticket.customer)
                    ticket.employees.map(employee => {
                        return getState().employees.find(emp=> {
                            return emp._id == employee
                        })
                    })
                    dispatch(addTicket(ticket))
                    history.push('/tickets')
                }
            })
            .catch(err => {
                if (err.response.status == 401) {
                    dispatch({type: 'LOGOUT'})
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err,
                    footer: 'Please try again'
                  })
                history.push('/account/login')
            })
    }
}

export const startPutTicket = (id, formData, history) => {
    return (dispatch) => {
        axios.put(`/tickets/${id}`, formData)
            .then(response=>{
                if (response.data.errors) {
                    Swal.fire({
                        icon: 'error',
                        text: response.data.message,
                    })
                } else {
                    const ticket = response.data
                    const id = ticket._id
                    dispatch(updateTicket(id, ticket))
                    history && history.push('/tickets')
                }
            })
            .catch(err => {
                if (err.response.status == 401) {
                    dispatch({type: 'LOGOUT'})
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err,
                    footer: 'Please try again'
                  })
                history.push('/account/login')
            })
    }
}

export const startDeleteTicket = (id) => {
    return (dispatch) => {
        axios.delete(`/tickets/${id}`)
            .then(response => {
                const id = response.data._id
                dispatch(removeTicket(id))
            })
            .catch(err => {
                if (err.response.status == 401) {
                    dispatch({type: 'LOGOUT'})
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'There was an error while deleting your ticket',
                    footer: 'Please try again'
                  })
            })
    }
}