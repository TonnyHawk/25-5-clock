import './styles.css';
import iconPlay from './play.svg';
import Setter from '../../components/Setter';
import { useSelector, useDispatch } from 'react-redux';

export default function SetPage(){
   let sessionDuration = useSelector((state)=>state.sessionDuration);
   let breakDuration = useSelector((state)=>state.breakDuration);
   let dispatch = useDispatch();

   let sessionInc = ()=>{
      dispatch({type: 'session/inc'})
   }
   let sessionDec = ()=>{
      dispatch({type: 'session/dec'})
   }

   let breakInc = ()=>{
      dispatch({type: 'break/inc'})
   }
   let breakDec = ()=>{
      dispatch({type: 'break/dec'})
   }
   
   return (
      <div class="app">
         <div class="app__setters">
            <Setter 
               title={'Session duration'} 
               baseVal={sessionDuration} 
               inc={sessionInc} 
               dec={sessionDec}
               />
            <Setter 
               title={'Break duration'} 
               baseVal={breakDuration} 
               inc={breakInc} 
               dec={breakDec}
               />
         </div>
         <button class="app__start start-btn">
            <img src={iconPlay} alt=""/>
         </button>
      </div>
      )
}