import './styles.css';
import SetPage from './pages/set';
import LoaderPage from './pages/loader';
import TimerPage from './pages/timer';
import { useSelector, useDispatch } from 'react-redux';
import {useEffect, useState} from 'react';

let timer, now;
let endPoint = 0;

function App() {
  let dispatch = useDispatch();
  let allTime = useSelector((state)=>state.sessionDuration) * 60 * 1000;
  let timeLeft = useSelector((state)=>state.timeLeft);
  let minutesLeft = Math.floor(timeLeft / 60000);
  let seccondsLeft = ((timeLeft % 60000) / 1000).toFixed(0);

  let [status, setStatus] = useState('Timer set');

  function Timer(){
    now = new Date().getTime();
    timeLeft = endPoint - now;
    if(timeLeft >= 0){
      dispatch({type: 'timeLeft/set', payload: timeLeft})
    }else{
      dispatch({type: 'timeLeft/set', payload: 0})
      setStatus('Finished');
      clearInterval(timer)
      alert('Time passed')
    }
  }

  function startTimer(){
    now = new Date().getTime();
    endPoint = now + allTime;
    setStatus('Running');
    dispatch({type: 'allTime/set', payload: allTime})

    timer = setInterval(Timer, 1000);
  }

  function refreshTimer(){
    clearInterval(timer);
    dispatch({type: 'timeLeft/set', payload: 0})
    setStatus('Timer set')
  }

  function pauseTimer(){
    clearInterval(timer);
    setStatus('Paused');
  }

  function resumeTimer(){
    setStatus('Running');
    let now = new Date().getTime();
    endPoint = now + timeLeft;

    timer = setInterval(Timer, 1000);
  }


  return (
    <>
    {/* <LoaderPage/> */}
    {/* <SetPage/> */}
    <TimerPage minutes={minutesLeft} secconds={seccondsLeft} status={status} start={startTimer} refresh={refreshTimer} resume={resumeTimer} pause={pauseTimer}/>
    </>
  );
}

export default App;
