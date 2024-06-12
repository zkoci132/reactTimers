const sql = require('msnodesqlv8')
const connStr = require('../../config/database')


const buildQuery = function(req){
    
    const callQuery = async (req)=>{
        
        return await sqlQuery(req)
    }

    const sqlQuery = (req)=>{


    
            return new Promise((resolve,reject)=>{
                //let values = [req.body.logToManage.totalsecs + req.body.logToManage]
                //console.log(req.body.logToStart.totalsecs)
                //console.log(values)
               
                let query = `UPDATE dbo.tasks SET isrunning = ? where id = ${req.body.logToStart.id}`
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