import './styles.css';
import iconPause from './pause.svg';
import iconPlay from './play.svg';
import iconRepeat from './repeat.svg';
import iconClose from './close.svg';

export default function TimerPage({minutes, secconds, status, start, refresh, resume, pause}){
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


   return (
   <div class="timer">
      <img src={iconClose} alt="" class="timer__close-btn"/>
      <p class="timer__title">{status}</p>
      <p class="timer__screen">
         {String(minutes).length === 1 ? '0' + minutes : minutes}
         :
         {String(secconds).length === 1 ? '0' + secconds : secconds}
      </p>
      <div class="timer__actions">
         <div class="timer__action timer__action_play" onClick={handleClick}>
            <img src={(status === 'Timer set' || status === 'Paused' || status === 'Finished') ? iconPlay : iconPause} alt=""/>
         </div>
         <div class="timer__action timer__action_replay" onClick={()=>refresh()}>
            <img src={iconRepeat} alt=""/>
         </div>
      </div>
   </div>
   )
}