/*eslint-disable no-unused-vars, no-undef-expression, no-unused-params*/
var Cloudant = require('@cloudant/cloudant');
// Initialize Cloudant with settings from .env
var url = "https://apikey-v2-1bq5bek45y4si8vk0an624mf5ijkeotpb6tiq484kgb9:70e61c5af190bddf5988cfb279bfdf0d@1e87e31e-6e1d-4175-9123-57662e6d7df2-bluemix.cloudantnosqldb.appdomain.cloud";
var username = "apikey-v2-1bq5bek45y4si8vk0an624mf5ijkeotpb6tiq484kgb9";
var password = "70e61c5af190bddf5988cfb279bfdf0d";
var cloudant = Cloudant({ url:url, username:username, password:password });
const express = require("express");
const path = require("path");
var mysql = require('mysql');
const path2 = __dirname + '/views/';
const json2html = require('node-json2html');
const app = express();
//const port = 8000;
var port = process.env.VCAP_APP_PORT || 8081;
let alert = require('alert'); 
var db = "project";
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // For serving static files
//app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));
// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')); // Set the views directory
// var connection = mysql.createPool(
//     {
//         host: "localhost",
//         user: "root",
//         password: "Yash@123",
//         database: "project"
//     }
// );
app.get('/success', (req, res) => {
    res.sendFile(path2 + 'success.html');
});
// ENDPOINTS
app.get('/', (req, res) => {
    const params = {};
    res.status(200).render('index.pug', params);
});
app.get('/error', (req, res) => {
    res.sendFile(path2 + 'logerror.html');
});
app.get('/new1', (req, res) => {
    const params = {};
    res.status(200).render('index1.pug', params);
});
app.get('/login', (req, res) => {
    res.sendFile(path2 + 'login.html');
});
app.post('/login', function (request, response) {
    var username = request.body.uname;
    var password = request.body.psw;
    if (username && password) {
        connection.query('SELECT * FROM login WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            if (results.length > 0) {
                // request.session.loggedin = true;
                // request.session.username = username;
                response.redirect('/new1');
            } else {
                response.redirect('/error');
                // response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});
app.get('/reg', (req, res) => {
    res.sendFile(path2 + 'reg.html');
});
app.post('/reg', function (request, response) {
    var username = request.body.uname;
    var password = request.body.psw;
    var age = request.body.age;
    var address = request.body.address;
    cloudant.db.create('register', (err) => {
        if (err) {
          console.log(err);
        } else {
          cloudant.use('register').insert({username,password,age,address}, 'register', (err, data) => {
            if (err) {
              console.log(err);
            } else {
              console.log(data); // { ok: true, id: 'rabbit', ...
            }
          });
        }
      });


        // var sql = "Insert into order_details (username,origin,name,Destination) VALUES ('" + request.body.username + "','" + request.body.origin + "','" + request.body.name + "','" + request.body.Destination + "')";
        // connection.query(sql, function (err, result) {
        //     if (err) throw err;
            console.log(request.body.uname);
            // cloudant.use('bookdata').insert({username,origin,name,Destination}, 'Bookdata', (err, data) => {
            //     if (err) {
            //         response.redirect('/success');
            //     } else {
            //       console.log(data); // { ok: true, id: 'rabbit', ...
            //     }
            //   });
            console.log("1 record inserted");
        });
app.get('/book', (req, res) => {
    res.sendFile(path2 + 'book.html');
});
app.post('/book', function (request, response) {
    var username = request.body.username;
    var origin = request.body.origin;
    var name = request.body.name;
    var Destination = request.body.Destination;
    cloudant.db.create('bookdata', (err) => {
        if (err) {
          console.log(err);
        } else {
          cloudant.use('bookdata').insert({username,origin,name,Destination}, 'Bookdata', (err, data) => {
            if (err) {
              console.log(err);
            } else {
              console.log(data); // { ok: true, id: 'rabbit', ...
            }
          });
        }
      });


        // var sql = "Insert into order_details (username,origin,name,Destination) VALUES ('" + request.body.username + "','" + request.body.origin + "','" + request.body.name + "','" + request.body.Destination + "')";
        // connection.query(sql, function (err, result) {
        //     if (err) throw err;
            console.log(request.body.uname);
            // cloudant.use('bookdata').insert({username,origin,name,Destination}, 'Bookdata', (err, data) => {
            //     if (err) {
            //         response.redirect('/success');
            //     } else {
            //       console.log(data); // { ok: true, id: 'rabbit', ...
            //     }
            //   });
            console.log("1 record inserted");
        });

app.get('/update', (req, res) => {
    res.sendFile(path2 + 'update.html');
});
app.post('/update', function (request, response) {
    var username = request.body.username;
    var origin = request.body.origin;
    var name = request.body.name;
    var Destination = request.body.Destination;    
    connection.getConnection((err) => {
        if (err) throw err;
        var sql = "update order_details set username='" + request.body.username + "',origin='" + request.body.origin + "',name='" + request.body.name + "',destination='" + request.body.Destination + "' where order_id='" + request.body.id + "'";
        connection.query(sql, (err, ans) => {
            if (err) throw err;
            console.log("1 RECORDE UPDATED");

        });
        response.send("UPDATED SUCESSFULLY");
    });
});
app.get('/del', (req, res) => {
    res.sendFile(path2 + 'delete.html');
});
app.post('/del', function (request, response) {
    var _id = request.body.id;
    cloudant.db.create('register', (err) => {
        if (err) {
          console.log(err);
        } else {
          cloudant.use('register').delete({_id}, 'register', (err, data) => {
            if (err) {
              console.log(err);
            } else {
              console.log(data); // { ok: true, id: 'rabbit', ...
            }
          });
        }
      });


    // var author = request.body.author;
    // var price = request.body.price;
    // var Destination = request.body.Destination;
    connection.getConnection(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = `DELETE FROM order_details WHERE order_id=${id}`;
        // var sql = `select * from userdata WHERE user_id=${id}`;
        // response.redirect('/');
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log(request.body.book_id);
            response.send("Order Information Deleted");
            console.log("1 record inserted");
            // connection.end();
        });

        // response.end();
    });

});
app.get('/disp', (request, response) => {

    connection.getConnection(function (err) {
        if (err) throw err;
        console.log("Connected!");
        // var sql = `DELETE FROM userdata WHERE user_id=${id}`;
        var sql = `select * from order_details`;
        // response.redirect('/');
        connection.query(sql, function (err, result) {
            if (err) throw err;
            let template = { '<>': 'div', 'html': '${user_id} ${username} ${Address} ${Age} ${password}' };
            let html = json2html.render(result, template);
            response.send(result);

            console.log(result);
            // response.end();
        });

        // response.end();
    });

});
app.get('/pay', (req, res) => {
    res.sendFile(path2 + 'ui.html');
});
app.post('/pay', function (request, response) {
        connection.getConnection(function (err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = "Insert into pay (cn,date1,cvv,name) VALUES ('" + request.body.cn + "','" + request.body.date1 + "','" + request.body.cvv + "','" + request.body.name + "')";
            response.redirect('/new1');
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log(request.body.uname);
                console.log("1 record inserted");
            });

            response.end();
        });
});
app.get('/track', (req, res) => {
    res.sendFile(path2 + 'track.html');
});
app.get('/contact', (req, res) => {
    res.sendFile(path2 + 'contact.html');
});
app.get('/search', (req, res) => {
    res.sendFile(path2 + 'search.html');
});
app.post('/search', function (request, response) {
    var id = request.body.id;
    // var author = request.body.author;
    // var price = request.body.price;
    // var Destination = request.body.Destination;

    connection.getConnection(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = `select *  FROM userdata WHERE user_id=${id}`;
        // var sql = `select * from userdata WHERE user_id=${id}`;
        // response.redirect('/');
        connection.query(sql, function (err, result) {
            if (err) throw err;
            response.send(result);
            console.log("1 record inserted");
            // connection.end();
        });

        // response.end();
    });

});
// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});