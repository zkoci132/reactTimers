import '../styles/showModalHeader.css'
import {useEffect,useState} from 'react'
import HeaderInput from './HeaderInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil,faCheck,faX } from '@fortawesome/free-solid-svg-icons';

function ModalHeader({setCurrentTotalTime,currentName,modalStatus,currentID,currentData,setCurrentData,currentInitialTime,setCurrentInitialTime}){
    const [currentNameContent,setCurrentNameContent] = useState('')
    const [currentNameStatus,setCurrentNameStatus] = useState(false)


    function handleSubmit(){
        

        fetch("http://localhost:5000/changeName",{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
              },
              body: JSON.stringify({
                newName:currentNameContent,
                idToChange: currentID
              })
        })
        .then(response => response.json())
        .then(data =>{
            console.log(data)
            setCurrentData(data[0])
            setCurrentInitialTime(data[1].currentInitialTime)
            setCurrentTotalTime(data[2][0].secondsToSum)
        })
    }


    function handleCancel(){
        setCurrentNameContent(currentName)
    }

    useEffect(()=>{
        setCurrentNameContent(currentName)
    },[currentName,currentID])
    return (
        <header className={modalStatus === false ? 'hideModalHeader' : 'showModalHeader'}>
            {modalStatus === false ? '' : currentNameStatus === false ? currentNameContent :
             <HeaderInput currentNameContent={currentNameContent} setCurrentNameContent={setCurrentNameContent} currentID={currentID}/>}
             <div onClick={()=>{setCurrentNameStatus(!currentNameStatus)}}> {currentNameStatus === false ? <FontAwesomeIcon icon={faPencil}/> :
                <div><button className='acceptButton' onClick={()=>{handleSubmit()}}><FontAwesomeIcon icon={faCheck}/></button><button className='cancelButton' onClick={()=>{handleCancel()}}><FontAwesomeIcon icon={faX}/></button></div>}</div>
        </header>
    )
}

export default ModalHeader