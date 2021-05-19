const mysql=require('mysql')
const con = mysql.createConnection({
    host:'localhost',
    user : 'root',
    password:'',
    database:'bottest0'
})
function connect(){   
    con.connect((err)=>{
        if(err){
            console.log('could not connect to db')
            console.log(err)
        }
    })
    console.log('connected to db')
    return
}
connect()

function insertData(userId){
    con.query("SELECT * FROM usr WHERE id = '"+userId+"'",function (err, result) {
        if (err) {
            console.log('error occured while searching in db')
        }else{
            if(result.length==0){
            let sql = "INSERT INTO usr (id, idd) VALUES ('"+userId+"', '"+userId+"')";
            con.query(sql, function (err, result) {
                if (err) {
                    console.log('error occured while inserting data to db')
                    console.log(err)
                }else{
                console.log("1 record inserted");
                }
            });
            }else{
                console.log('user exist')
            }
        }
    });
}


module.exports={insertData:insertData,con:con}