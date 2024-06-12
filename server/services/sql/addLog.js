const sql = require('msnodesqlv8')
const connStr = require('../../config/database')


const buildQuery = function(){

    const callQuery = async ()=>{
        return await sqlQuery()
    }

    const sqlQuery = ()=>{
        return new Promise((resolve,reject)=>{
            let values = [0,false,'PlaceHolder','New Task']
            let query = 'INSERT INTO dbo.tasks(totalsecs,isrunning,description,taskname) VALUES(?,?,?,?)'
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