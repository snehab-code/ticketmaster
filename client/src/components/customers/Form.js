import React from 'react'


class CustomerForm extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            email: this.props.email? this.props.email : '',
            name: this.props.name? this.props.name : '',
            mobile: this.props.mobile? this.props.mobile : ''
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            email: this.state.email,
            name: this.state.name,
            mobile: this.state.mobile
        }

        this.props.handleSubmit(formData)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="name">Name</label>
                    <div className="col-sm-10">
                    <input className="form-control" type="text" value={this.state.name} onChange={this.handleChange} id="name" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="email">Email</label>
                    <div className="col-sm-10">
                    <input className="form-control" type="text" value={this.state.email} onChange={this.handleChange} id="email" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="mobile">mobile</label>
                    <div className="col-sm-10">
                    <input className="form-control" type="text" value={this.state.mobile} onChange={this.handleChange} id="mobile" />
                    </div>
                </div>
                <input className="btn btn-block btn-primary" type="submit" />
            </form>
        )
    }
}

export default CustomerForm