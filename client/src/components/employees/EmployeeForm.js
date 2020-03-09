import React from 'react'
import {connect} from 'react-redux'

class EmployeeForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name? this.props.name : '',
            email: this.props.email? this.props.email : '',
            mobile: this.props.mobile ? this.props.mobile : '',
            department: this.props.department ? this.props.department._id : ''
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
            department: this.state.department,
        }
        this.props.handleSubmit(formData)
    }

    render() {
        console.log('props', this.props)
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="name">Name </label>
                    <div className="col-sm-10">
                    <input className="form-control" type="text" name="name" value = {this.state.name} id="name" onChange = {this.handleChange}></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="email">Email </label>
                    <div className="col-sm-10">
                    <input className="form-control" name="email" value = {this.state.email} id="email" onChange = {this.handleChange}></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="mobile">mobile </label>
                    <div className="col-sm-10">
                    <input className="form-control" type="text" name="mobile" value = {this.state.mobile} id="mobile" onChange = {this.handleChange}></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="department">Department</label>
                    <div className="col-sm-10">
                    <select className="form-control" name="department" value={this.state.department} onChange={this.handleChange}>
                        <option></option>
                        {
                            this.props.departments.map(department => {
                                return (
                                    <option key={department._id} value={department._id}>{department.name}</option>
                                )
                            })
                        }
                    </select>
                    </div>
                </div>
                    <input className="btn btn-block btn-primary" type="submit" />
                </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        departments: state.departments
    }
}

export default connect(mapStateToProps)(EmployeeForm)