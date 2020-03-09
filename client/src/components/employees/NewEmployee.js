import React from 'react'
import EmployeeForm from './EmployeeForm'
import {connect} from 'react-redux'
import {startPostEmployee} from '../../actions/employees'

function EmployeeNew(props){

    const handleSubmit = (formData) => {
        props.dispatch(startPostEmployee(formData, props.history))
    }

    return (
        <div className="border p-5 rounded">
            <h1 className="text-center mb-3">Add Employee</h1>
            <EmployeeForm handleSubmit={handleSubmit} />
        </div>
    )
}

export default connect()(EmployeeNew)