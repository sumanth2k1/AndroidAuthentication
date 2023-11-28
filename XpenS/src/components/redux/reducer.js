import { CARD_DATA, CURR_USER_DATA } from "./constants";

const initialState = {};

export const reducer = (state = initialState,action)=>{
    switch(action.type){
        case CURR_USER_DATA:
            return action.data
        default:
            return state
    }
}

export const cardDataReducer = (state = initialState, action)=>{
    switch (action.type) {
        case CARD_DATA:
            return action.data    
        default:
            return state
    }
}