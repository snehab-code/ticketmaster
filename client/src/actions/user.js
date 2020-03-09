import axios from '../config/axios'
import {startGetCustomers} from './customers'
import {startGetDepartments} from './departments'
import {startGetEmployees} from './employees'
import {startGetTickets} from './tickets'

const loginUser = () => {
    return {type: 'LOGIN'}
}

export const logoutUser = () => {
    return {type: 'LOGOUT'}
}
 
export const startUserLogin = (formData, history) => {
    return (dispatch) => {
        axios.post('/users/login', formData)
            .then(response => {
                if(response.data.token) {
                    const token = response.data.token
                    localStorage.setItem('authToken', token)
                    dispatch(loginUser())
                    dispatch(startGetCustomers())
                    dispatch(startGetDepartments())
                    dispatch(startGetEmployees())
                    dispatch(startGetTickets())
                    history.push('/')
                } else {
                    dispatch(logoutUser())
                }
            })
            .catch(err => {
                // console.log(err)
            })
    }
}