import '../styles/appFooter.css';
import { useEffect,useState } from "react";

function AppFooter({currentTotalTime,setCurrentData,setCurrentInitialTime,setCurrentTotalTime}){
    
    const exportData = function(){
        fetch("http://localhost:5000/exportData",{
        method: "POST",
        //mode: 'no-cors',
        headers: {
        "Content-Type":"application/json"
        },
        body: JSON.stringify({
            Type: 'All'
        })
        
    })
    .then(response => response.blob())
    .then(blob =>{
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url;
        a.download = 'testFF.txt'
        //a.download = 'testFF.xlsx'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    })
       .catch(error => console.error('Error:',error)) 
   

    

    /*
    .then(data =>{
      setCurrentData(data[0])
      //console.log(data[0])
      setCurrentInitialTime(data[1].currentInitialTime)
      setCurrentTotalTime(data[2][0].secondsToSum)
    })
    */
    }

    return(
            <footer>
                <div className='displayFooter'>{currentTotalTime}</div>
                <button className='footerButton' onClick={exportData}>Export</button>
            </footer>
              
    )
}

export default AppFooter