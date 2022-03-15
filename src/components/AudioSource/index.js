import beepSound from './beep.mp3';

export default function AudioSource({beep}){
   return (
   <audio controls ref={beep} style={{display: 'none'}}>
      <source src={beepSound} type="audio/mpeg"/>
      Your browser does not support the audio tag.
   </audio>
   )
}