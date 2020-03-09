import React from 'react'
import EmployeeForm from './EmployeeForm'
import {connect} from 'react-redux'
import {idSelector} from '../../store/configureStore'
import {startPutEmployee} from '../../actions/employees'

function EmployeeEdit(props){

    const handleSubmit = (formData) => {
        const id = props.match.params.id
        props.dispatch(startPutEmployee(id,formData, props.history))
    }
    return (
        <div className="border p-5 rounded">
            <h1 className="text-center mb-3">Edit Employee</h1>
            {props.employee && props.employee.name && <EmployeeForm handleSubmit = {handleSubmit} {...props.employee} /> }
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        employee: idSelector(state.employees, props.match.params.id)
    }
}

export default connect(mapStateToProps)(EmployeeEdit)