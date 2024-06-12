import {useEffect,useState} from 'react'
import fuckGod from '../fuckGod/play.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay,faPause,faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/logHolder.css';
import Modal from './Modal'
function LogHolder({ log,deleteTimer,incrementTimer,startTimer,stopTimer,currentInitialTime,openModal,modalStatus }){
    //const [initialTime,setInitialTime] = useStated()
    const [currentRealTime,setCurrentRealTime] = useState(Date.now)
    const [timePassed,setTimePassed] = useState(Date.now)
    const [dateadded,setDateAdded] = useState(log.formattedDate)
    

    const [totalTimePassed,setTotalTimePassed] = useState(Date.now() - new Date(currentInitialTime).getTime())

    //const [totalsecs,setTotalsecs]
    useEffect(()=>{
        console.log(`${log.id} : ${log.isrunning}`)
        if(log.isrunning === true){
            
            console.log(log)
            const timer = setTimeout(()=>{
                setCurrentRealTime(Date.now())
                let msecs = currentRealTime - timePassed
                if(msecs >= 1000){
                    
                    incrementTimer(log,totalTimePassed)
                    setTimePassed(Date.now())
                    setTotalTimePassed((Date.now() - new Date(currentInitialTime).getTime())/1000)
                }

                
            },100)
            return () => {clearTimeout(timer)}
        }
    })

    return(
        <>
            <span className={log.isrunning === true ? 'logHolderSelected' : 'logHolder'} onClick={()=>{openModal(log)}}><div className='logContentHolder'><div className='infos'>{`${log.taskName} - ${log.realTime === null ? "00:00:00" : log.realTime} - Added:    ${dateadded}`}</div><div className='buttons'><div className='startStop'><button className='startButton' onClick={(e)=>{startTimer(log,currentInitialTime,e)}}><FontAwesomeIcon icon={faPlay}/></button><button className='stopButton' onClick={(e)=>{stopTimer(log,setTotalTimePassed,e)}}><FontAwesomeIcon icon={faPause}/></button></div><div className='delete'><button className='deleteButton' onClick={(e)=>{deleteTimer(log,e)}}><FontAwesomeIcon icon={faTrash}/></button></div></div></div></span>
        </>
    )
}

export default LogHolder