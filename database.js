var mysql=require('mysql');
var con =mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"Yash@123"
    }
);
con.connect(function(err)
{
    if(err) throw err;
    console.log("Connected");
    con.query("Create database project" ,function (err )
    {
        if(err) throw err;
        console.log("Created Database");

});
});