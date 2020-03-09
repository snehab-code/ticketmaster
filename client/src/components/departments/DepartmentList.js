import React from 'react'
import axios from '../../config/axios'
import DepartmentForm from './DepartmentForm'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {startPostDepartment, startDeleteDepartment, startPutDepartment} from '../../actions/departments'
import Swal from 'sweetalert2'

class DepartmentList extends React.Component{
    constructor() {
        super()
        this.state = {
            deptName: ''
        }
    }

    handleChange = (e) => {
        this.setState({deptName: e.target.value})
    }

    handleSubmit = (formData) => {
        this.props.dispatch(startPostDepartment(formData))
    }

    handleRemove = (dept) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                    this.props.dispatch(startDeleteDepartment(dept))
            }
          })
    }
    handleEdit = (deptId) => {
        Swal.fire({
            title: 'Edit department',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Edit',
            preConfirm: (dept) => {
                const formData = {
                    name: dept
                }
                return this.props.dispatch(startPutDepartment(deptId, formData))
            }
        })
    }

    render () {
        return (
        <div className="row col-md-12">
            <div className="col-md-9">
                <h2>Departments</h2>
                <ul className="list-group">
                    {
                        this.props.departments && this.props.departments.map(department => {
                            return (
                                <li className="list-group-item d-flex" key={department._id}>
                                    <Link style={{color:"black", textDecoration:"none"}} className="p-2 flex-grow-1" to={`/departments/${department._id}`}>
                                    <span className="text-uppercase">{department.name}</span>
                                    </Link>
                                    <div>
                                    <button className="btn btn-primary btn-sm m-2" onClick={() => {this.handleEdit(department._id)}}>Edit</button>
                                    <button className="btn btn-primary btn-sm" onClick={() => {this.handleRemove(department._id)}}>Remove</button>
                                    </div>
                                </li>
                            )                    
                        })
                    }
                </ul>
            </div>
            <div className="col-md-3 bg-light d-flex justify-content-center align-items-center">
                <DepartmentForm  handleSubmit={this.handleSubmit}/>
            </div> 
        </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        departments: state.departments
    }
}

export default connect(mapStateToProps)(DepartmentList)