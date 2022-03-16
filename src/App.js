import './styles.css';
import SetPage from './pages/set';
import LoaderPage from './pages/loader';
import TimerPage from './pages/timer';
import { useSelector, useDispatch } from 'react-redux';
import {useState, useRef} from 'react';
import AudioSource from './components/AudioSource';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import {useEffect} from 'react'
import { motion, AnimatePresence } from "framer-motion";


let timer, now, betweenModesTimer;
let endPoint = 0;

let allTime = 0;
let timerType = '';

function useAlltime(){
  timerType = useSelector((state)=>state.timerType);
  allTime = useSelector((state)=>state[`${timerType}Duration`]) * 60 * 1000
  console.log('---allTime: '+allTime);
}

function App() {
  useAlltime()
  console.log('===================re-renders');
  console.log('Type: '+timerType);
  let dispatch = useDispatch();
  console.log(timerType);
  let timeLeft = useSelector((state)=>state.timeLeft);
  let minutesLeft = Math.floor(timeLeft / 60000);
  let seccondsLeft = ((timeLeft % 60000) / 1000).toFixed(0);
  console.log('minutes left: '+minutesLeft);
  console.log('secconds left: '+seccondsLeft);

  let beepSound = useRef(null)

  let [status, setStatus] = useState('Timer set');

  function defineTimeLeft(){
    now = new Date().getTime();
    endPoint = now + allTime;
    timeLeft = endPoint - now;
    dispatch({type: 'timeLeft/set', payload: timeLeft})
  }

  useEffect(defineTimeLeft, [])

  function Timer(){
    now = new Date().getTime();
    timeLeft = endPoint - now;
    if(timeLeft >= 0){
      dispatch({type: 'timeLeft/set', payload: timeLeft})
    }else{
      document.title = `${timerType} passed`
      clearInterval(timer)
      console.log('Time passed')
      setStatus('Finished');
      dispatch({type: 'timeLeft/set', payload: 0})
      let counter = 0; // count finish timer occurings
      betweenModesTimer = setInterval(()=>{
        beepSound.current.play()
        counter = counter+1;
        if(counter > 3) {
          clearInterval(betweenModesTimer)
          dispatch({type: 'timerType/switch'})
          startTimer()
        }
      }, 1000)
    }
  }

  function startTimer(){
    clearInterval(betweenModesTimer)
    clearInterval(timer)
    defineTimeLeft()
    setStatus('Running');
    dispatch({type: 'allTime/set', payload: allTime})

    timer = setInterval(Timer, 1000);
  }

  function refreshTimer(){
    clearInterval(timer);
    clearInterval(betweenModesTimer)
    dispatch({type: 'timerType/set', payload: 'session'})
    defineTimeLeft()
    setStatus('Timer set')
  }

  function pauseTimer(){
    clearInterval(timer);
    clearInterval(betweenModesTimer)
    setStatus('Paused');
  }

  function resumeTimer(){
    clearInterval(betweenModesTimer)
    setStatus('Running');
    let now = new Date().getTime();
    endPoint = now + timeLeft;

    timer = setInterval(Timer, 1000);
  }

  let location = useLocation()

  return (
    <>
    
      <AnimatePresence exitBeforeEnter initial={false}>
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<SetPage start={startTimer}/>} />
          <Route path="/timer" element={
            <TimerPage 
            minutes={minutesLeft} 
            secconds={seccondsLeft} 
            status={status} 
            type={timerType} 
            start={startTimer} 
            refresh={refreshTimer} 
            resume={resumeTimer} 
            pause={pauseTimer}
            initiate={defineTimeLeft}/>} 
          />
        </Routes>
      </AnimatePresence>
    <AudioSource beep={beepSound}/>
    <LoaderPage/>
    </>
  );
}

export default App;
