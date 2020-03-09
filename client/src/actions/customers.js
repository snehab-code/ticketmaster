import axios from '../config/axios'
import Swal from 'sweetalert2'

const setCustomers = (customers) => {
    return {type: 'SET_CUSTOMERS', payload: customers}
}

const addCustomer = (customer) => {
    return {type: 'ADD_CUSTOMER', payload: customer}
}

const updateCustomer = (id, customer) => {
    return {type: 'UPDATE_CUSTOMER', payload: {id, customer}}
}

const removeCustomer = (id) => {
    return {type: 'REMOVE_CUSTOMER', payload: id}
}

export const startGetCustomers = () => {
    return (dispatch) => {
        axios.get('/customers')
            .then(response => {
                dispatch({type:'LOGIN'})
                const customers = response.data
                dispatch(setCustomers(customers))
            })
            .catch(err => {
                if (err.response.status == 401) {
                    dispatch({type: 'LOGOUT'})
                }
            })
    }
}

export const startPostCustomer = (formData, history) => {
    return (dispatch) => {
        axios.post('/customers', formData)
            .then(response => {
                if (response.data.errors) {
                    Swal.fire({
                        icon: 'error',
                        text: response.data.message,
                    })
                } else {
                    const customer = response.data
                    dispatch(addCustomer(customer))
                    history.push('/customers')
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

export const startPutCustomer = (id, formData, history) => {
    return (dispatch) => {
        axios.put(`/customers/${id}`, formData)
            .then(response=>{
                if (response.data.errors) {
                    Swal.fire({
                        icon: 'error',
                        text: response.data.message,
                    })
                } else {
                    const customer = response.data
                    const id = customer._id
                    dispatch(updateCustomer(id, customer))
                    history.push('/customers')
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

export const startDeleteCustomer = (id) => {
    return (dispatch) => {
        axios.delete(`/customers/${id}`)
            .then(response => {
                const id = response.data._id
                dispatch(removeCustomer(id))
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
            })
    }
}