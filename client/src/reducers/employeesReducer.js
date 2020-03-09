const employeesReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_EMPLOYEES' : {
            return [...action.payload]
        }
        case 'ADD_EMPLOYEE': {
            return [...state, action.payload]
        }
        case 'REMOVE_EMPLOYEE': {
            return state.filter(employee => employee._id !== action.payload)
        }
        case 'UPDATE_EMPLOYEE': {
            return state.map(employee => {
                if (employee._id === action.payload.id) {
                    return {...employee, ...action.payload.employee}
                } else {
                    return {...employee}
                }
            })
        }
        case 'LOGOUT': {
            return []
        }
        default: {
            return state
        }
    }
}

export default employeesReducer