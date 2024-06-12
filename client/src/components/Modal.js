import {useEffect,useState} from 'react'
import DescInput from './DescInput'
import ModalHeader from './ModalHeader'
import '../styles/showModal.css'
import '../styles/showModalBackground.css'
function Modal({openModal,modalStatus,currentTimer,currentData,setCurrentData,currentInitialTime,setCurrentInitialTime,setCurrentTotalTime}){
    

 
    return(
        <div onClick={()=>{openModal(currentTimer)}} className={modalStatus === false ? 'hideModalBackground' : 'showModalBackground'}>
            <div onClick={(e) => { e.stopPropagation(); }} className={modalStatus === false ? 'hideModal' : 'showModal'}>
                <ModalHeader setCurrentTotalTime={setCurrentTotalTime} currentData={currentData} setCurrentData={setCurrentData} currentInitialTime={currentInitialTime} setCurrentInitialTime={setCurrentInitialTime} currentName={currentTimer === null ? '' : currentTimer.taskName} modalStatus={modalStatus} currentID={currentTimer === null ? '' : currentTimer.id}/>
                <DescInput setCurrentTotalTime={setCurrentTotalTime} setCurrentData={setCurrentData} setCurrentInitialTime={setCurrentInitialTime} modalStatus={modalStatus} currentDesc={currentTimer === null ? '' : currentTimer.description} currentID={currentTimer === null ? '' : currentTimer.id}  />
            </div>
        </div>
        
        
    )
}

export default Modal