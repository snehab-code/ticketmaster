const userReducer = (state = {isLoading: true}, action) => {
    switch(action.type) {
        case 'LOGIN': {
            return {isLoggedIn: true}
        }
        case 'LOGOUT' : {
            return {isLoggedIn: false}
        }
        default: {
            return state
        }
    }
}

export default userReducer