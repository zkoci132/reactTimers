const sql = require('msnodesqlv8')
const connStr = require('../../config/database')



const buildQuery = function(req){

    const callQuery = async (req)=>{
        return await sqlQuery(req)
    }

    const sqlQuery = (req)=>{
        
        
        return new Promise((resolve,reject)=>{
            sql.query(connStr.connStr,`select *,CONVERT(VARCHAR(10),dateadded,101) AS formattedDate,CONVERT(varchar(8),DATEADD(SECOND,displaytime,0),108) AS realTime from dbo.tasks where id = ${req.body.idToExport}`,[],(err,rows)=>{
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