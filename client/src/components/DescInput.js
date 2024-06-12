
import { useEffect,useState } from 'react'
import '../styles/showDesc.css'

function DescInput({setCurrentTotalTime,setCurrentData,setCurrentInitialTime,modalStatus,currentDesc,currentID}){
    const [textContent,setTextContent] = useState('')
    function handleSubmit(e){
        e.preventDefault();

        fetch("http://localhost:5000/getForm",{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
              },
              body: JSON.stringify({
                newText:textContent,
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


    /*
    function handleExport(){
        fetch("http://localhost:5000/exportData",{
        method: "POST",
        //mode: 'no-cors',
        headers: {
        "Content-Type":"application/json"
        },
        body: JSON.stringify({
            Type: 'Single',
            idToExport: currentID
        })
        
    })
    .then(response => response.blob())
    .then(blob =>{
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url;
        a.download = 'testFF.txt'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    })
       .catch(error => console.error('Error:',error)) 
   

    */

    /*
    .then(data =>{
      setCurrentData(data[0])
      //console.log(data[0])
      setCurrentInitialTime(data[1].currentInitialTime)
      setCurrentTotalTime(data[2][0].secondsToSum)
    })
    */
    //}


    function handleExport(){
        fetch("http://localhost:5000/exportData",{
        method: "POST",
        //mode: 'no-cors',
        headers: {
        "Content-Type":"application/json"
        },
        body: JSON.stringify({
            Type: 'Single',
            idToExport: currentID
        })
        
    })
    .then(response => response.blob())
    .then(blob =>{
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url;
        a.download = 'testFF.txt'
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




    useEffect(()=>{
        setTextContent(currentDesc)
    },[currentDesc,currentID])


    



    return(
        <>

            
        
            
            <div className='textHolder'>
                <form className='descriptionForm' method="post" onSubmit={handleSubmit}>
                    <textarea className={modalStatus === false ? 'hidedesc' : 'showdesc'} rows="15" cols="70" value={textContent} onChange={e => setTextContent(e.target.value)}>
                     
                     </textarea>
                     <button className={modalStatus === false ? 'hidebutton' : 'showbutton'} type="submit">Save</button>
                     <button onClick={handleExport} className={modalStatus === false ? 'hideExportbutton' : 'showExportbutton'}>Export</button>
                </form>
               
            </div>
             
        </>
    )
}

export default DescInput