const sql = require('msnodesqlv8')
const connStr = require('../../config/database')


const buildQuery = function(){

    const callQuery = async ()=>{
        return await sqlQuery()
    }

    const sqlQuery = ()=>{
        return new Promise((resolve,reject)=>{
            sql.query(connStr.connStr,'select * from dbo.initialTime',[],(err,rows)=>{
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