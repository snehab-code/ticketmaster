import React from 'react'

class DepartmentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name? this.props.name : ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.name
        }
        this.props.handleSubmit(formData)
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <form className="col-md-12 text-center" onSubmit={this.handleSubmit}>
                    <h3>Add</h3>
                    <input className="mb-2 form-control" type = "text" name="name" value = {this.state.name} onChange={this.handleChange}/>
                    <input className="btn btn-primary btn-sm btn-block" type="submit" />
            </form>
        )
    }
}

export default DepartmentForm