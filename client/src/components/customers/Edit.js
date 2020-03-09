import React from 'react'
import CustomerForm from './Form'
import {connect} from 'react-redux'
import {idSelector} from '../../store/configureStore'
import {startPutCustomer} from '../../actions/customers'

function CustomerEdit(props){

    const handleSubmit = (formData) => {
        const id = props.match.params.id
        props.dispatch(startPutCustomer(id,formData, props.history))
    }
    return (
        <div>
            <h2>Edit Customer</h2>
            {props.customer && props.customer.name && <CustomerForm handleSubmit = {handleSubmit} {...props.customer} /> }
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        customer: idSelector(state.customers, props.match.params.id)
    }
}

export default connect(mapStateToProps)(CustomerEdit)