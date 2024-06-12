const express = require('express')
const cors = require('cors');
const app = express()



const sql = require('./services/sql/displayData')
const sql2 = require('./services/sql/incrementSeconds')
const sql3 = require('./services/sql/addLog')
const sql4 = require('./services/sql/startTimer')
const sql5 = require('./services/sql/updateInitialTime')
const sql6 = require('./services/sql/stopTimer')
const sql7 = require('./services/sql/resetInitialTime')
const sql8 = require('./services/sql/getInitialTime')
const sql9 = require('./services/sql/setFalse')
const sql10 = require('./services/sql/setTotalTime')
const sql11 = require('./services/sql/resetCurrentTime')
const sql12 = require('./services/sql/deleteTimer')
const sql13 = require('./services/sql/updateData')
const sql14 = require('./services/sql/updateName')
const sql15 = require('./services/sql/getTotalSeconds')
const sql16 = require('./services/sql/getSpecificData')


app.use(express.json())
app.use(cors())

app.use(express.static("public"))

let fs = require('fs');


const openFile = function(dataToSend,res,type){
    let DisplayStr = '';
    
    if(type === 'All'){
        for(let i = 0;i< dataToSend.length;i++){
            if(i !== dataToSend.length - 1){
                DisplayStr += dataToSend[i].taskName + '\n' + '\n' + dataToSend[i].description + '\n' + '\n' + dataToSend[i].realTime + '\n' + '\n' + '-----------' + '\n' + '\n'
            }
            else{
                DisplayStr += '--------------' + '\n'
                DisplayStr += 'TOTAL TIME:   ' +  dataToSend[i][0].secondsToSum + '\n'
                DisplayStr += '--------------' + '\n'
            }
            
        }
    }
    else{
        DisplayStr += dataToSend[dataToSend.length-1].taskName + '\n' + '\n' + dataToSend[dataToSend.length-1].description + '\n' + '\n' + dataToSend[dataToSend.length-1].realTime
    }
    


    console.log(DisplayStr)
    res.setHeader('Content-Disposition','attachment; filename=testFF.txt')
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
    res.setHeader('Content-Type','text/plain');
    //res.setHeader('Content-Type','text/csv');
    res.send(DisplayStr)
}

app.post('/exportData',async (req,res)=>{
    console.log(req.body.Type)
    let exportData
    console.log(req.body)
    if(req.body.Type === 'All'){
        console.log('what the fuck')
        exportData = await sql.callQuery()
        exportData.push(await sql15.callQuery())
        console.log(exportData)
    }
    else{
        exportData = await sql16.callQuery(req)
        console.log(exportData)
        
    }
    openFile(exportData,res,req.body.Type)
})

app.post('/stopTimer',async (req,res)=>{
    let displayData = []
    
    let tempData = await sql8.callQuery();
    if(tempData[0] === undefined){
        return 
    }
    console.log(`heeeeeeeeeeeeeeeeere${tempData}`)
    console.log(tempData[0])
    console.log(`IDSSSS: ${req.body.logToStop.id} ---- ${tempData[0].currentRunner}`)
    if(tempData[0].currentRunner != req.body.logToStop.id){
        console.log('ere capn')
        displayData.push(await sql.callQuery())
        displayData.push(await sql8.callQuery())
        displayData.push(await sql15.callQuery())
        displayData.push('Need to stop the correct timer')
        res.send(displayData)
    }
   
    else{
        await sql6.callQuery(req)
        await sql10.callQuery(req)
        await sql7.callQuery()
        await sql11.callQuery(req)
        displayData.push(await sql.callQuery())
        displayData.push(await sql8.callQuery())
        displayData.push(await sql15.callQuery())
        res.send(displayData)
    }
    
})


app.post('/deleteTimer',async(req,res)=>{
    let displayData = []
    let tempData = await sql8.callQuery()
    if(tempData[0] === undefined){
        await sql12.callQuery(req)
        displayData.push(await sql.callQuery())
        displayData.push(await sql8.callQuery())
        displayData.push(await sql15.callQuery())
        res.send(displayData)
    }
    else if(tempData[0].currentRunner == req.body.logToDelete.id){
        console.log('made it here')
        displayData.push(await sql.callQuery())
        displayData.push(await sql8.callQuery())
        displayData.push(await sql15.callQuery())
        res.send(displayData) 
    }
    else{
        await sql12.callQuery(req)
        displayData.push(await sql.callQuery())
        displayData.push(await sql8.callQuery())
        displayData.push(await sql15.callQuery())
        res.send(displayData)
    }
    

    
})

app.post('/startTimer',async (req,res)=>{
    console.log('ere')
    let displayData = []
    //let testTime = await sql8.callQuery()
    //console.log(`TSET TIME: ${req.body.prevTime} - ${req.body.logToStart.currentsecs}`)
    if(req.body.prevTime !== undefined){
        displayData.push(await sql.callQuery())
        displayData.push(await sql8.callQuery())
        displayData.push(await sql15.callQuery())
        res.send(displayData)
    }
    else{
        await sql7.callQuery()
        await sql5.callQuery(req)
        await sql9.callQuery(req)
        await sql4.callQuery(req)
        displayData.push(await sql.callQuery())
        //console.log(displayData)
        displayData.push(await sql8.callQuery())
        displayData.push(await sql15.callQuery())
        console.log(`displayData: ${displayData}`)
        res.send(displayData)
    }
    
})


app.post('/incrementTimer',async (req,res)=>{
    console.log(`ehhhheye ${req.body.currentDate}`)
    let displayData = []
    await sql2.callQuery(req)
    displayData.push(await sql.callQuery(req))
    displayData.push(await sql8.callQuery(req))
    displayData.push(await sql15.callQuery())
    res.send(displayData)

})

app.post('/displayData',async (req,res)=>{
    let displayData = []
    displayData.push(await sql.callQuery(req))
    displayData.push(await sql8.callQuery(req))
    displayData.push(await sql15.callQuery())
    console.log(displayData)
    console.log(`eeeeeeeeeere ${displayData}`)
    res.send(displayData)
    displayData = []
})

app.post('/addLog',async(req,res)=>{
    let data = []
    await sql3.callQuery()
    data.push(await sql.callQuery())
    data.push(await sql8.callQuery())
    data.push(await sql15.callQuery())
    console.log(data)
    res.send(data)

})

app.post('/getForm',async(req,res)=>{
    let displayData = []
    await sql13.callQuery(req)
    displayData.push(await sql.callQuery())
    displayData.push(await sql8.callQuery())
    displayData.push(await sql15.callQuery())
    res.send(displayData)
})


app.post('/changeName',async(req,res)=>{
    let displayData = []
    await sql14.callQuery(req)
    displayData.push(await sql.callQuery())
    displayData.push(await sql8.callQuery())
    displayData.push(await sql15.callQuery())
    res.send(displayData)
})

app.listen(5000,()=>{
    console.log('working')
})


