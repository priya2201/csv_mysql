const csvtojson=require('csvtojson');
const mysql=require('mysql2');

const hostname="localhost",
username="root"
password="MyStrongPassword1234$",
databasename="csvtomysql"

let con=mysql.createConnection({
    host:hostname,
    user:username,
    password:password,
    database:databasename
})

con.connect((err)=>{
    if(err) return console.error(
        'error:'+err.message
    );

    con.query("drop table sample",
    (err,drop)=>{
        //query to create table smaple
        var createStatement=
        'create table sample (name char(50),'+
        'email char(50), age int,city char(30))'

        con.query(createStatement,(err,drop)=>{
            if(err)
            console.log('Error',err);
        })
    })
})
const fileName="sample.csv";
csvtojson().fromFile(fileName).then(source=>{
    
    console.log(source)
    // Fetching the data from each row 
    // and inserting to the table "sample"
    for(var i=0;i<source.length;i++){
        var name=source[i]['name'],
        email=source[i]['email'],
        age=source[i]['age'],
        city=source[i]['city']

    var insertStatement=
    `insert into sample values(?,?,?,?)`
    var items=[name,email,age,city];

    // Inserting data of current row
        // into database
    con.query(insertStatement,items,
        (err,results,fields)=>{
            if(err){
                console.log('Unable to insert at row',i+1);
                return console.log(err)
            }
        })

    }
    console.log('all items stored into database successfully')
})