import axios from '../config/axios'
import Swal from 'sweetalert2'

const setEmployees = (employees) => {
    return {type: 'SET_EMPLOYEES', payload: employees}
}

const addEmployee = (employee) => {
    return {type: 'ADD_EMPLOYEE', payload: employee}
}

const updateEmployee = (id, employee) => {
    return {type: 'UPDATE_EMPLOYEE', payload: {id, employee}}
}

const removeEmployee = (id) => {
    return {type: 'REMOVE_EMPLOYEE', payload: id}
}

export const startGetEmployees = () => {
    return (dispatch) => {
        axios.get('/employees')
            .then(response => {
                const employees = response.data
                dispatch(setEmployees(employees))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const startPostEmployee = (formData, history) => {
    return (dispatch, getState) => {
        axios.post('/employees', formData)
            .then(response => {
                if (response.data.errors) {
                    Swal.fire({
                        icon: 'error',
                        text: response.data.message,
                    })
                } else {
                    const employee = response.data
                    employee.department = getState().departments.find(dept => dept._id == employee.department)
                    dispatch(addEmployee(employee))
                    history.push('/employees')
                }
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

export const startPutEmployee = (id, formData, history) => {
    return (dispatch, getState) => {
        axios.put(`/employees/${id}`, formData)
            .then(response=>{
                if (response.data.errors) {
                    Swal.fire({
                        icon: 'error',
                        text: response.data.message,
                    })
                } else {
                    const employee = response.data
                    employee.department = getState().departments.find(dept => dept._id == employee.department)
                    const id = employee._id
                    dispatch(updateEmployee(id, employee))
                    history.push('/employees')
                }
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'There was an error while updating your employee',
                    footer: 'Please try again'
                  })
            })
    }
}

export const startDeleteEmployee = (id) => {
    return (dispatch) => {
        axios.delete(`/employees/${id}`)
            .then(response => {
                const id = response.data._id
                dispatch(removeEmployee(id))
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'There was an error while deleting your employee',
                    footer: 'Please try again'
                  })
            })
    }
}