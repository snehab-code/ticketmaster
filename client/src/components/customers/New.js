import React from 'react'
import CustomerForm from './Form'
import {connect} from 'react-redux'
import {startPostCustomer} from '../../actions/customers'

function CustomerNew(props){

    const handleSubmit = (formData) => {
        props.dispatch(startPostCustomer(formData, props.history))
    }

    return (
        <div>
            <h1>Add Customer</h1>
            <CustomerForm handleSubmit={handleSubmit} />
        </div>
    )
}

export default connect()(CustomerNew)