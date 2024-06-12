const sql = require('msnodesqlv8')
const connStr = require('../../config/database')



const buildQuery = function(req){

    const callQuery = async (req)=>{
        return await sqlQuery(req)
    }

    const sqlQuery = (req)=>{
        return new Promise((resolve,reject)=>{
            sql.query(connStr.connStr,`delete from dbo.tasks where id = ${req.body.logToDelete.id}`,[],(err,rows)=>{
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