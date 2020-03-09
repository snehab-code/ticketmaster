import React from 'react'
import {connect} from 'react-redux'

class TicketForm extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            code: this.props.code ? this.props.code : '',
            customer: this.props.customer? this.props.customer._id: '',
            department: this.props.department? this.props.department._id: '',
            employee: [],
            message: this.props.message? this.props.message: '',
            priority: this.props.priority ? this.props.priority : ''
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
        // const selectoptions = [...event.target.options].filter(o => o.selected).map(o => o.value)
    }

    handleMultiSelect = (e) => {
        const employee=[]
        for (let val of e.target.selectedOptions) {
            employee.push({_id: val.value})
        }
        this.setState({employee})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData={
            code: this.state.code,
            message: this.state.message,
            priority: this.state.priority,
            department: this.state.department,
            employees: this.state.employee,
            customer: this.state.customer
        }
        this.props.handleSubmit(formData)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form-group">
                <label htmlFor="code">Code</label>
                <input className="form-control" type="text" name="code" id="code" value={this.state.code} onChange={this.handleChange} />
                <label htmlFor="message">Message</label>
                <textarea className="form-control" name="message" id="message" value={this.state.message} onChange={this.handleChange} />
                
                <div className="form-row">
                <div className="col-md-6">
                <label htmlFor="customer">Customer </label>
                <select className="form-control" name="customer" id="customer" value={this.state.customer} onChange={this.handleChange}>
                    <option>select</option>
                    {
                        this.props.customers.map(customer => {
                            return <option key={customer._id} value={customer._id}>{customer.name}</option>
                        })
                    }
                </select>
                </div>
                <div className="col-md-6 d-flex flex-column">
                <span>Priority</span>
                <div className="form-check form-check-inline flex-grow-1">
                <input className="form-check-input" type="radio" name="priority" id="high" value="high" checked={this.state.priority === "high"? true : false} onChange={this.handleChange} />
                <label className="form-check-label" htmlFor="high">High</label>
                <input className="form-check-input" type="radio" name="priority" id="medium" value="medium" checked={this.state.priority === "medium"? true : false} onChange={this.handleChange} />
                <label className="form-check-label" htmlFor="medium">Medium</label>
                <input className="form-check-input" type="radio" name="priority" id="low" value="low" checked={this.state.priority === "low"? true : false} onChange={this.handleChange} />
                <label className="form-check-label" htmlFor="low">Low</label>
                </div>
                </div>
                </div>
                <div className="form-row">
                <div className="col-md-6">
                <label htmlFor="department">Department</label>
                <select className="form-control" name="department" id="department" value={this.state.department} onChange={this.handleChange}>
                    <option>select</option>
                    {
                        this.props.departments.map(department => {
                            return <option key={department._id} value={department._id}>{department.name}</option>
                        })
                    }
                </select>
                </div>
                <div className="col-md-6">
                <label htmlFor="employee">Employee </label>
                <select className="form-control" multiple={true} name="employee" id="employee" onChange={this.handleMultiSelect}>
                    <option>select</option>
                    {
                        this.props.employees.filter(emp => emp.department._id == this.state.department).map(employee => {
                            return <option key={employee._id} value={employee._id}>{employee.name}</option>
                        })
                    }
                </select>
                </div>
                </div>
                <input className="btn btn-primary btn-block" type="submit" value="add ticket" />
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        departments: state.departments,
        employees: state.employees,
        customers: state.customers
    }
}

export default connect(mapStateToProps)(TicketForm)