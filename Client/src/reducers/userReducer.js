const userReducer = (state = {
    username: '',
    email: '',
    bearerToken:''
}, action) => {
    switch (action.type) {
        case 'SAVE_USER_DETAILS':
            state = {
                ...state,
                username: action.payload.username,
                email: action.payload.email,
                bearerToken: action.payload.bearerToken
            }
            return state;
        default:
            return state;
    }

}

export default userReducer;