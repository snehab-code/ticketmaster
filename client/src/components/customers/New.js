import React from 'react'
import CustomerForm from './Form'
import {connect} from 'react-redux'
import {startPostCustomer} from '../../actions/customers'

function CustomerNew(props){

    const handleSubmit = (formData) => {
        props.dispatch(startPostCustomer(formData, props.history))
    }

    return (
        <div className="border p-5 rounded">
            <h1 className="text-center mb-3">Add Customer</h1>
            <CustomerForm handleSubmit={handleSubmit} />
        </div>
    )
}

export default connect()(CustomerNew)