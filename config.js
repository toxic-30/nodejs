let mysql=require('mysql');
let con = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"root",
    database:"result",
    multipleStatements:true
});

con.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  });

module.exports=con;