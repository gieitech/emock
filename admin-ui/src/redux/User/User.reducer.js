// importing types
import userTypes from './User.types';


const INITIAL_STATE = {
    AdminUser : null,
    fetching : false,
}

const userReducer = (state = INITIAL_STATE , action) => {

    switch(action.type){
        case userTypes.LOGIN : 
            return {
                ...state,
                AdminUser : action.payload
            }
        default : 
            return state;
    }
}

export default userReducer;