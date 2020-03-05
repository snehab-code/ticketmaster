import React from 'react'
import axios from '../../config/axios'
import DepartmentForm from './DepartmentForm'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'

class DepartmentList extends React.Component {
    constructor() {
        super()
        this.state = {
            departments: [],
            // deptName: ''
        }
    }

    componentDidMount() {
        axios.get('/departments/', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const departments = response.data
            this.setState({departments})
        })
    }

    handleChange = (e) => {
        this.setState({deptName: e.target.value})
    }

    handleSubmit = (formData) => {
        axios.post('/departments', formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            console.log(response.data)
            if(response.data.hasOwnProperty('errors')) {
                Swal.fire('Error', 'errorerrorerror', 'error' )
            } else {
                Swal.fire('yay!', 'department added', 'success')
                this.setState(prevState => {
                    const departments = [...prevState.departments, response.data]
                    // return {departments, deptName: ''}
                    return {departments}
                })
            }
        })
        .catch(err => {
            console.log(err)
            Swal.fire('Error', 'errorerrorerror', 'error' )
        })
    }

    handleRemove = (dept) => {
        // Swal.fire returns a promise!
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
                axios.delete(`/departments/${dept}`, {
                    headers: {
                        'x-auth': localStorage.getItem('authToken')
                    }
                })
                .then(response => {
                    if (response.data.errors) {
                        alert(response.data.message)
                    } else {
                        // window.location.reload()
                        this.setState(prevState => {
                            const departments = prevState.departments.filter(department => department._id !== response.data._id)  
                            return ({departments, deptName: ''})
                        })
    
                    }
                })
                .catch(err => {
                    console.log(err)
                })
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
              }
            
          })
        
    }

    // handleSubmit = (formData) => {
    //     axios.post('/departments/', formData, {
    //         headers: {
    //             'x-auth': localStorage.getItem('authToken')
    //         }
    //     })
    //     .then(response => {
    //         const department = response.data
    //         this.setState(prevState => ({
    //             departments: prevState.departments.concat(department)
    //         }))
    //     })
    //     .catch(error => alert(error))
    // }


    render() {
        return (
            <div className="row">
                <div className="col-md-8">
                    <h2>Departments - {this.state.departments.length}</h2>
                    <ul className="list-group">
                        {
                            this.state.departments.map(department => {
                                return (
                                    <li className="list-group-item" key={department._id}>
                                        <Link style={{color: 'black'}} to={`/departments/${department._id}`}>
                                        <span className="text-uppercase">{department.name}</span>
                                        </Link>
                                        <button className="btn btn-primary btn-sm float-right" onClick={() => {this.handleRemove(department._id)}}>Remove</button>
                                    </li>
                                )                    
                            })
                        }
                    </ul>
                </div>
                <div className="col-md-4">
                    <DepartmentForm handleSubmit={this.handleSubmit}/>
                </div>
                
                
            </div>
        )
    }
}

export default DepartmentList