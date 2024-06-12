import '../styles/showHeaderInput.css'

function HeaderInput({currentNameContent,setCurrentNameContent,currentID,handleSubmit}){
    
   

    return(
        
            <input className='headerInput' name="myInput" value={currentNameContent} onChange={e=>setCurrentNameContent(e.target.value)}/>  
     
            
      
    )
}

export default HeaderInput