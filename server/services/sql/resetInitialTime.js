const sql = require('msnodesqlv8')
const connStr = require('../../config/database')


const buildQuery = function(){
    
    const callQuery = async ()=>{
        
        return await sqlQuery()
    }

    const sqlQuery = (req)=>{
        return new Promise((resolve,reject)=>{
            let values = []
            //console.log(req.body.logToStart.totalsecs)
            //console.log(values)
            let query = `truncate table dbo.initialTime`
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