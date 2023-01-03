
export const TOKE_FOR_AUTHORIZATION = 'TOKE_FOR_AUTHORIZATION'


// const tokenFromLs = JSON.parse(localStorage.getItem('todos')) ? JSON.parse(localStorage.getItem('todos')):'';

const defaultState = {
    products: [],
    token: '',
}


export const reducer = (state = defaultState, action) => {
    switch(action.type){
            case TOKE_FOR_AUTHORIZATION: 
                return {...state, token: action.payload}


        default:
            return state;
    }
}