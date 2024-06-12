const sql = require('msnodesqlv8')
const connStr = require('../../config/database')


const buildQuery = function(){

    const callQuery = async ()=>{
        return await sqlQuery()
    }

    const sqlQuery = ()=>{
        return new Promise((resolve,reject)=>{
            sql.query(connStr.connStr,'SELECT CONVERT(varchar(8), DATEADD(SECOND, SUM(CASE WHEN isrunning = 1 THEN totalsecs + currentsecs ELSE totalsecs END), 0), 108) AS secondsToSum FROM dbo.tasks',[],(err,rows)=>{
                if(err){
                    console.log('Error executing query',err)
                    reject(err)
                }else{
                    console.log('here')
                    resolve(rows)
                }
            })
        })
    }

    return { callQuery }
}

module.exports = buildQuery()