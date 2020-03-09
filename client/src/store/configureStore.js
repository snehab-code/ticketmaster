import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../reducers/userReducer'
import customersReducer from '../reducers/customersReducer'
import departmentsReducer from '../reducers/departmentsReducer'
import employeesReducer from '../reducers/employeesReducer'
import ticketsReducer from '../reducers/ticketsReducer'

const configureStore = () => {
    const store = createStore(combineReducers({
        user: userReducer,
        customers: customersReducer,
        departments: departmentsReducer,
        employees: employeesReducer,
        tickets: ticketsReducer
        }), applyMiddleware(thunk))
    return store
}

export const idSelector = (state, id) => {
    return state.find(item => item._id == id)
}

export default configureStore