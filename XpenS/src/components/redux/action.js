import { CARD_DATA, CURR_USER_DATA } from "./constants";

export function currUserData(userData){
    return{
        type:CURR_USER_DATA,
        data:userData
    }
}
export function cardData(cardData){
    // console.log(cardData)
    return{
        type:CARD_DATA,
        data:cardData
    }
}