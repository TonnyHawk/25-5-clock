import { createStore } from 'redux'

let primaryState = {
   sessionDuration: 0.05,
   breakDuration: 5,
   timeLeft: 0
}

function reducer(state=primaryState, action){
   let {sessionDuration, breakDuration} = state;
   switch(action.type){
      case 'session/inc':
         if(sessionDuration < 60){
            sessionDuration = sessionDuration + 1
         }else{
            sessionDuration = 0
         }
         return {
            ...state,
            sessionDuration
         }
      case 'session/dec':
         if(sessionDuration > 0){
            sessionDuration = sessionDuration - 1
         }else{
            sessionDuration = 60
         }
         return {
            ...state,
            sessionDuration
         }
      case 'break/inc':
         if(breakDuration < 60){
            breakDuration = breakDuration + 1
         }else{
            breakDuration = 0
         }
         return {
            ...state,
            breakDuration
         }
      case 'break/dec':
         if(breakDuration > 0){
            breakDuration = breakDuration - 1
         }else{
            breakDuration = 60
         }
         return {
            ...state,
            breakDuration
         }
      case 'timeLeft/set':
         return {
            ...state,
            timeLeft: action.payload
         }
      default:
         return state
   }
}

let store = createStore(reducer)

export default store;

