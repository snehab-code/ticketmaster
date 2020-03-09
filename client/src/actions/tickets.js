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
                console.log(err)
            })
    }
}

export const startPostTicket = (formData) => {
    return (dispatch) => {
        axios.post('/tickets', formData)
            .then(response => {
                const ticket = response.data
                dispatch(addTicket(ticket))
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err,
                    footer: 'Please try again'
                  })
            })
    }
}

export const startPutTicket = (id, formData) => {
    return (dispatch) => {
        axios.put(`/tickets/${id}`, formData)
            .then(response=>{
                const ticket = response.data
                const id = ticket._id
                dispatch(updateTicket(id, ticket))
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'There was an error while updating your ticket',
                    footer: 'Please try again'
                  })
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
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'There was an error while deleting your ticket',
                    footer: 'Please try again'
                  })
            })
    }
}