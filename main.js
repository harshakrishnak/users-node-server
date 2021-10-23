var express = require('express');
var app = express();
var fs = require("fs");
var cors = require('cors')

app.use(express.json())
app.use(cors())


app.get('/listUsers', function (req, res) {
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        res.end(data);
    });
})

app.post('/addUser', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data[req.body.id] = req.body;
        fs.writeFile(__dirname + "/" + "users.json", JSON.stringify(data), function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
        res.end(JSON.stringify(data));
    });
})

app.delete('/deleteUser/:id', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        delete data[req.params.id];
        fs.writeFile(__dirname + "/" + "users.json", JSON.stringify(data), function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
        res.end(JSON.stringify(data));
    });
})

var server = app.listen(8081, function () {
    // var host = server.address().address
    // var port = server.address().port
    //console.log("Example app listening at http://%s:%s", host, port)
})
