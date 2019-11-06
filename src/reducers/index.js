// reducers

import { combineReducers } from 'redux'

// nilai awal simpan auth
const initState = {
    id :0,
    username: '',
    jabatan : '',
    divisi :''
}



const authReducer = (state = initState, action) =>{
    switch(action.type){
        case "LOGIN_SUCCESS":
            return {...state, id: action.payload.id, username: action.payload.username, jabatan: action.payload.jabatan, divisi : action.payload.divisi}   

        case "LOGOUT_SUCCESS":
            return {...state,...initState} 
        default:
            return state
    }
}


// unutnuk menentukan tempat onyeimpanan dari dari setiap reduces
// authReducers alkan memikili tempat penyimpanan auth 
let reducers = combineReducers(
    {
        auth : authReducer,
    }
)

export default reducers
// action adalah bject yang memiliki 2 properti 
    // type : untuk menentukan reducers mana yang akan mengola 
    // payload : berisi data yang akan di olah
    // {
    //     type: "register",
    //     payload : {name: 'Steave', job : 'Jobs'}
    // }