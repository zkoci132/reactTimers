const sql = require('msnodesqlv8')
const connStr = require('../../config/database')


const buildQuery = function(req){
    
    const callQuery = async (req)=>{
        
        return await sqlQuery(req)
    }

    const sqlQuery = (req)=>{
        return new Promise((resolve,reject)=>{
            if(req.body.totalSecsPassed === null){
                req.body.totalSecsPassed = 0
            }
            let values = [parseInt(req.body.totalSecsPassed),parseInt(req.body.logToStart.totalsecs + req.body.totalSecsPassed)]
            console.log(`totalsecs: ${req.body.logToStart.totalsecs}`)
            console.log(`other: ${req.body.totalSecsPassed}`)
            console.log(values)
            let query = `UPDATE dbo.tasks SET currentsecs = ?,displaytime = ? where id = ${req.body.logToStart.id}`
            sql.query(connStr.connStr,query,values,(err,rows)=>{
                if(err){
                    console.log('Error executing query',err)
                    reject(err)
                }else{
                    resolve(rows)
                }
            })
        })
    }

    return { callQuery }
}

module.exports = buildQuery()