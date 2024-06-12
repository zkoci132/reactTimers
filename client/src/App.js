import './styles/app.css';
import TimeManager from './components/TimeManager'
import Modal from './components/Modal'
import AppHeader from './components/AppHeader';
import {useEffect,useState} from 'react'

function App() {
  const [modalStatus,setModalStatus] = useState(false)
  const [currentTimer,setCurrentTimer] = useState(null)
  const [currentData,setCurrentData] = useState()
  const [currentInitialTime,setCurrentInitialTime] = useState()
  const [currentTotalTime,setCurrentTotalTime] = useState()
  
  //const [currentDate,setCurrentDate] = useState(Date.now)
  const openModal = function(timer){
    setModalStatus(!modalStatus)
    setCurrentTimer(timer)
    console.log(timer)
  }
/*
  const handleDateChange = function(date){
    setCurrentDate(date)
    console.log(currentDate)
    fetch("http://localhost:5000/displayData",{
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        currentDate: currentDate
      })
    
    })
    .then(response => response.json())
    .then(data => {
      setCurrentData(data[0])
      setCurrentInitialTime(data[1].currentInitialTime)
      console.log(data[1])
      
    })
    .catch(error => {
      console.error("Error:",error)
    })
  }
  */
  return(
   
      <div className='appHolder'>
        <TimeManager openModal={openModal} modalStatus={modalStatus} currentData={currentData} currentInitialTime={currentInitialTime} setCurrentData={setCurrentData} setCurrentInitialTime={setCurrentInitialTime} setCurrentTotalTime={setCurrentTotalTime} currentTotalTime={currentTotalTime}/>
        <Modal openModal={openModal} modalStatus={modalStatus} currentTimer={currentTimer} currentData={currentData} setCurrentData={setCurrentData} currentInitialTime={currentInitialTime} setCurrentInitialTime={setCurrentInitialTime} setCurrentTotalTime={setCurrentTotalTime}/>
      </div>

  )
}

export default App;
