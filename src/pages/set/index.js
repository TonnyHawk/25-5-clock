import './styles.css';
import iconPlay from './play.svg';
import Setter from '../../components/Setter';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import {motion} from 'framer-motion'

export default function SetPage({start}){

   let navigate = useNavigate();
   let sessionDuration = useSelector((state)=>state.sessionDuration);
   let breakDuration = useSelector((state)=>state.breakDuration);
   let dispatch = useDispatch();

   let thisPage = useRef(null);

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

   let actionStart = ()=>{
      setTimeout(start, 400);
      navigate('/timer');
   }
   
   return (
      <motion.div 
      initial={{opacity: 0}}
      animate={{opacity: 1, transition: {duration: 0.7}}}
      exit={{opacity: 0, transition: {duration: 0.3}}}
      class="app" ref={thisPage}>
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
         <button class="app__start start-btn" onClick={actionStart}>
            <img src={iconPlay} alt=""/>
         </button>
      </motion.div>
      )
}