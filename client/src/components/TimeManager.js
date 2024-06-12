import '../styles/timeManager.css';
import LogHolder from './LogHolder'
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';

import {useEffect,useState} from 'react'

function TimeManager({openModal,modalStatus,currentData,currentInitialTime,setCurrentData,setCurrentInitialTime,currentDate,setCurrentTotalTime,currentTotalTime}) {
  


  const stopTimer = function(log,setTotalTimePassed,e){
    e.stopPropagation()
    setTotalTimePassed(0)
    fetch("http://localhost:5000/stopTimer",{
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        logToStop:log,
      })
    })
    .then(response => response.json())
    .then(data =>{
      console.log(`data2 -- ${data[2].secondsToSum}`)
      setCurrentData(data[0])
      setCurrentInitialTime(data[1].currentInitialTime)
      setCurrentTotalTime(data[2][0].secondsToSum)
    })
  }
  
  

  const startTimer = function(log,currentInitialTime,e){
    e.stopPropagation()
    fetch("http://localhost:5000/startTimer",{
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        logToStart: log ,
        prevTime: currentInitialTime
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(`heeeeeeeeere: ${data}`)
      console.log(`data2 -- ${data[2].secondsToSum}`)
      setCurrentData(data[0])
      setCurrentInitialTime(data[1].currentInitialTime)
      setCurrentTotalTime(data[2][0].secondsToSum)
    })
  }

  const incrementTimer = function(log,timePassed){
    
    console.log(`time passed: ${timePassed}`)
    fetch("http://localhost:5000/incrementTimer",{
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        logToStart: log,
        totalSecsPassed: Math.round(timePassed)
      })
    })
    .then(response => response.json())
    .then(data => {
     // console.log(data)
     // console.log(data[2][0].secondsToSum)
      //console.log(data[2].secondsToSum)
      setCurrentData(data[0])
      setCurrentInitialTime(data[1][0].currentInitialTime)
      setCurrentTotalTime(data[2][0].secondsToSum)
    })
  }

  const deleteLog = function(doomedLog,e){
    e.stopPropagation()
    fetch("http://localhost:5000/deleteTimer",{
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        logToDelete:doomedLog
      })
    })
    .then(response => response.json())
    .then(data =>{
      setCurrentData(data[0])
      //console.log(data[0])
      setCurrentInitialTime(data[1].currentInitialTime)
      setCurrentTotalTime(data[2][0].secondsToSum)
    })
  }

  const createNewLog = function(){
    fetch("http://localhost:5000/addLog",{
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
    
    })
    .then(response => response.json())
    .then(data =>{
      console.log(`data is ${data}`)
      setCurrentData(data[0])
      setCurrentInitialTime(data[1].currentInitialTime)
      setCurrentTotalTime(data[2][0].secondsToSum)
    })
  }

  useEffect(()=>{
    fetch("http://localhost:5000/displayData",{
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },  
    })
    .then(response => response.json())
    .then(data => {
      setCurrentData(data[0])
      setCurrentInitialTime(data[1].currentInitialTime)
      setCurrentTotalTime(data[2][0].secondsToSum)
      console.log(data)
      
    })
    .catch(error => {
      console.error("Error:",error)
    })
  },[])
  return (
    
    <div className="App">
      
      <AppHeader createNewLog={createNewLog} setCurrentData={setCurrentData} setCurrentInitialTime={setCurrentInitialTime} setCurrentTotalTime={setCurrentTotalTime}/>
     
      
      <div className='dataHolder'>
      {
        currentData !== undefined ? <ul className='dataList'>
        {currentData.map((log,idx)=>{
          return(
       
              <LogHolder key={idx} log={log} deleteTimer={deleteLog} incrementTimer={incrementTimer} startTimer={startTimer} stopTimer={stopTimer} currentInitialTime={currentInitialTime} openModal={openModal} modalStatus={modalStatus}/>
              
              
          )
        })}
        </ul>
        :
        <div>Empty</div>
      }
      </div>
      
      <AppFooter currentTotalTime={currentTotalTime}/>
    </div>
  );
}

export default TimeManager;