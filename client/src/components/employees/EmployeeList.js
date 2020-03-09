import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {startDeleteEmployee} from '../../actions/employees'

function EmployeeList(props){

    const handleDelete = (id) => {
        props.dispatch(startDeleteEmployee(id))
    }

    return (
        <div className="col-md-12 text-center">
            <h2>Employee List</h2>
            <Link to="/employees/new"><button type="button" className="btn btn-primary mt-2 mb-3">Add employee</button></Link>
            <table className="table border">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
            {
                props.employees.map(employee => {
                    return (
                        <tr key={employee._id}>
                        <td><Link to ={`/employees/${employee._id}`}>{employee.name}</Link></td>
                        <td>{employee.mobile}</td> 
                        <td>{employee.email}</td>
                        <td>{employee.department.name}</td>
                        <td className="d-flex justify-content-around"><Link className="btn btn-primary" to={`/employees/edit/${employee._id}`}>edit</Link>
                        <button className="btn btn-danger" onClick={() => {handleDelete(employee._id)}}>Remove</button></td>
                        </tr>
                    )
                })
            }
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        employees: state.employees
    }
}

export default connect(mapStateToProps)(EmployeeList)