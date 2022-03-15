import './styles.css';
import iconPlay from './play.svg';
import Setter from '../../components/Setter';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import {useSpring, animated} from 'react-spring'

export default function SetPage({start}){
   const animProps = useSpring({
       to: { opacity: 1 }, 
       from: { opacity: 0 },
       config: {duration: 1000}
   })
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
      setTimeout(start, 2000);
      navigate('/timer');
   }
   
   return (
      <animated.div style={animProps} class="app" ref={thisPage}>
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
      </animated.div>
      )
}