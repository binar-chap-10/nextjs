import { SET_USER } from "../actions/actions-list";
const initialState = {
    user:{  
        loggedIn: "",
          fullname:""}

};
const userReducer = (state = initialState,action)=>{
    const{type,payload}=action;
    switch (type) {
        case SET_USER:
            return{
                ...state,
                user:{loggedIn:payload.loggedIn,fullname:payload.fullname}
            }
            break;
    
        default:
            return{
                ...state
            }
            break;
    }
}
export default userReducer;