import './styles.css';
import iconPause from './pause.svg';
import iconPlay from './play.svg';
import iconRepeat from './repeat.svg';
import iconClose from './close.svg';
import iconStop from './stop.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from "framer-motion"

export default function TimerPage({minutes, secconds, status, start, refresh, resume, pause, type, initiate}){
   let navigate = useNavigate();
   let handleClick = ()=>{
      switch (status) {
         case 'Timer set':
            start()
            break;
         case 'Running':
            pause()
            break;
         case 'Paused':
            resume()
            break;
         default:
            start() 
            break;
      }
   }

   useEffect(initiate, [])

   let actionClose = ()=>{
      refresh()
      navigate('/')
   }

   let setMainBtnIcon = ()=>{
      switch(status){
         case 'Running':
            return iconPause;
         default: 
            return iconPlay
      }

   }

   return (
      <>
   <motion.div 
      initial={{opacity: 0, y: '100vh'}}
      animate={{opacity: 1, y: 0}}
      exit={{opacity: 0, y: '100vh'}}
      transition={{duration: 0.5}}
      class="timer">
      <img src={iconClose} alt="" class="timer__close-btn" onClick={actionClose}/>
      <p className={`timer__title`}>{status}: {type}</p>
      <p className={`timer__screen ${status === 'Finished' ? 'finished' : ''}`}>
         {String(minutes).length === 1 ? '0' + minutes : minutes}
         :
         {String(secconds).length === 1 ? '0' + secconds : secconds}
      </p>
      <div class="timer__actions">
         <button class="btn timer__action timer__action_play" onClick={handleClick} disabled={status === 'Finished'}>
            <img src={setMainBtnIcon()} alt=""/>
         </button>
         <div class="timer__action timer__action_replay" onClick={()=>refresh()} style={status === 'Finished' ? {backgroundColor: 'hsl(49deg 90% 52%)'} : {}}>
            <img src={status === 'Finished' ? iconStop : iconRepeat} alt=""/>
         </div>
      </div>
   </motion.div>
   </>
   )
}