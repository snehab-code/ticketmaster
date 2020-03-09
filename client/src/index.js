import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import {startGetCustomers} from './actions/customers'
import {startGetDepartments} from './actions/departments'
import {startGetEmployees} from './actions/employees'
import {startGetTickets} from './actions/tickets'


const store = configureStore()
console.log(store.getState())
store.dispatch(startGetCustomers())
store.dispatch(startGetDepartments())
store.dispatch(startGetEmployees())
store.dispatch(startGetTickets())

store.subscribe(() => {
    console.log(store.getState(), 'store update')
})

const jsx = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'));


