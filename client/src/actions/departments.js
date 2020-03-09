import axios from '../config/axios'
import Swal from 'sweetalert2'

const setDepartments = (departments) => {
    return {type: 'SET_DEPARTMENTS', payload: departments}
}

const addDepartment = (department) => {
    return {type: 'ADD_DEPARTMENT', payload: department}
}

const updateDepartment = (id, department) => {
    return {type: 'UPDATE_DEPARTMENT', payload: {id, department}}
}

const removeDepartment = (id) => {
    return {type: 'REMOVE_DEPARTMENT', payload: id}
}

export const startGetDepartments = () => {
    return (dispatch) => {
        axios.get('/departments')
            .then(response => {
                const departments = response.data
                dispatch(setDepartments(departments))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const startPostDepartment = (formData) => {
    return (dispatch) => {
        axios.post('/departments', formData)
            .then(response => {
                const department = response.data
                dispatch(addDepartment(department))
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

export const startPutDepartment = (id, formData) => {
    return (dispatch) => {
        axios.put(`/departments/${id}`, formData)
            .then(response=>{
                const department = response.data
                const id = department._id
                dispatch(updateDepartment(id, department))
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'There was an error while updating your department',
                    footer: 'Please try again'
                  })
            })
    }
}

export const startDeleteDepartment = (id) => {
    return (dispatch) => {
        axios.delete(`/departments/${id}`)
            .then(response => {
                const id = response.data._id
                dispatch(removeDepartment(id))
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'There was an error while deleting your department',
                    footer: 'Please try again'
                  })
            })
    }
}