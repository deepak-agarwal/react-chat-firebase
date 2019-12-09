//login | logout |


export const authReducer = (state=null,action)=>{
    const {payload,type} = action
    switch(type){
        case 'REGISTER' : return ({...payload})
        case 'LOGIN' : return ({...payload})
        case 'LOGOUT' :  return ({})
        default : return({...state})
    }
}