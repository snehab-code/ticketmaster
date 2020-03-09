const departmentsReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_DEPARTMENTS' : {
            return [...action.payload]
        }
        case 'ADD_DEPARTMENT': {
            return [...state, action.payload]
        }
        case 'REMOVE_DEPARTMENT': {
            return state.filter(department => department._id !== action.payload)
        }
        case 'UPDATE_DEPARTMENT': {
            return state.map(department => {
                if (department._id === action.payload.id) {
                    return {...department, ...action.payload.department}
                } else {
                    return {...department}
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

export default departmentsReducer