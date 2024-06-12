import { useEffect,useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import '../styles/appHeader.css'
function AppHeader({createNewLog}){

    

  

    return(
        
        <div className='addDataButtonHolder'>
            <FontAwesomeIcon className='addIcon' onClick={createNewLog} icon={faCirclePlus}/>
       </div>
        
    )
}

export default AppHeader