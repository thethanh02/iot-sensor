var cors = require('cors'),
    express = require('express'),
    app = express(),
    server = require('http').createServer(app)

const e = require('cors');
var mqtt = require('mqtt')
var mysql = require('mysql2');
var moment = require('moment');

var con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "a123456",
    database: "iot"
});

app.use(cors())
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

var port = '5678'
server.listen(port, function () {
    console.log('Server listening on port ' + port)
})

con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
    var sql1 =
        `CREATE TABLE IF NOT EXISTS sensors(
            id int(10) not null primary key auto_increment, 
            time datetime not null, 
            temperature float not null, 
            humidity float not null, 
            light float not null)`
    con.query(sql1, (err) => {
        if (err) throw err;
        console.log("Table created");
    });
    var sql2 =
        `CREATE TABLE IF NOT EXISTS actions(
            id int(10) not null primary key auto_increment, 
            time datetime not null, 
            name text not null,
            action text not null)`
    con.query(sql2, (err) => {
        if (err) throw err;
        console.log("Table created");
    });
});

// Api
app.get('/api/lastest_sensors', function (req, res) {
    var num = 0
    var sql1 = `SELECT COUNT(id) AS NumberOfSensors FROM sensors`
    con.query(sql1, function (err, result) {
        if (err) throw err;
        num = result[0].NumberOfSensors

        num = num >= 10 ? num - 10 : num
        var sql = `SELECT * FROM sensors LIMIT ${num}, 10`
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.json(result)
        });
    });
})

app.get('/api/total_pages_sensors', function (req, res) {
    var params = req.query
    var varPerPage = 20
    if (Object.keys(req.query).length === 0) {
        var num = 0
        var sql1 = `SELECT COUNT(id) AS NumberOfSensors FROM sensors`
        con.query(sql1, function (err, result) {
            if (err) throw err;
            num = result[0].NumberOfSensors

            res.json(num === 0 ? 0 : Math.round(num/varPerPage) - 1)
        });
    } else if (params.date_from && params.date_to && params.time_from && params.time_to) {
        var datetime_from = moment(params.date_from).format('yyyy-MM-DD') + ' ' + params.time_from
        var datetime_to = moment(params.date_to).format('yyyy-MM-DD') + ' ' + params.time_to

        var sql = `SELECT COUNT(id) AS NumberOfSensors FROM sensors
            where time between '${datetime_from}' and '${datetime_to}'`

        con.query(sql, function (err, result) {
            if (err) throw err;
            num = result[0].NumberOfSensors

            res.json(num === 0 ? 0 : Math.round(num/varPerPage) - 1)
        });
    } else {

    }
})

app.get('/api/list_sensors', function (req, res) {
    var params = req.query
    var varPerPage = 20
    if (Object.keys(req.query).length <= 1) {
        var sql = `SELECT * FROM sensors 
            limit ${params.page ? varPerPage * (params.page) : 0}, ${varPerPage};`

        con.query(sql, function (err, result) {
            if (err) throw err;
            res.json(result)
        });
    } else if (params.date_from && params.date_to && params.time_from && params.time_to) {
        var datetime_from = moment(params.date_from).format('yyyy-MM-DD') + ' ' + params.time_from
        var datetime_to = moment(params.date_to).format('yyyy-MM-DD') + ' ' + params.time_to

        var sql = `SELECT * FROM sensors 
            where time between '${datetime_from}' and '${datetime_to}'
            limit ${params.page ? varPerPage * (params.page) : 0}, ${varPerPage};`

        con.query(sql, function (err, result) {
            if (err) throw err;
            res.json(result)
        });
    } else {

    }
})

app.get('/api/total_pages_actions', function (req, res) {
    var params = req.query
    var varPerPage = 10
    if (Object.keys(req.query).length === 0) {
        var num = 0
        var sql1 = `SELECT COUNT(id) AS NumberOfActions FROM actions`
        con.query(sql1, function (err, result) {
            if (err) throw err;
            num = result[0].NumberOfActions

            res.json(num === 0 ? 0 : Math.round(num/varPerPage) - 1)
        });
    } else if (params.date_from && params.date_to && params.time_from && params.time_to) {
        var datetime_from = moment(params.date_from).format('yyyy-MM-DD') + ' ' + params.time_from
        var datetime_to = moment(params.date_to).format('yyyy-MM-DD') + ' ' + params.time_to

        var sql = `SELECT COUNT(id) AS NumberOfActions FROM actions
            where time between '${datetime_from}' and '${datetime_to}'`

        con.query(sql, function (err, result) {
            if (err) throw err;
            num = result[0].NumberOfActions

            res.json(num === 0 ? 0 : Math.round(num/varPerPage) - 1)
        });
    } else {

    }
})

app.get('/api/list_actions', function (req, res) {
    var params = req.query
    var varPerPage = 10
    if (Object.keys(req.query).length <= 1) {
        var sql = `SELECT * FROM actions 
            limit ${params.page ? varPerPage * (params.page) : 0}, ${varPerPage};`

        con.query(sql, function (err, result) {
            if (err) throw err;
            res.json(result)
        });
    } else if (params.date_from && params.date_to && params.time_from && params.time_to) {
        var datetime_from = moment(params.date_from).format('yyyy-MM-DD') + ' ' + params.time_from
        var datetime_to = moment(params.date_to).format('yyyy-MM-DD') + ' ' + params.time_to

        var sql = `SELECT * FROM actions 
            where time between '${datetime_from}' and '${datetime_to}'
            limit ${params.page ? varPerPage * (params.page) : 0}, ${varPerPage};`

        con.query(sql, function (err, result) {
            if (err) throw err;
            res.json(result)
        });
    } else {

    }
})

// SocketIO
io.on('connection', (socket) => {
    console.log('Socket connected')
    socket.on('esp/ledy', (message) => {
        client.publish('esp/ledy', message);

        var sql =
            `INSERT INTO 
            actions (time, name, action) 
            VALUES 
            ("${getStringDateTime()}", "LedY", "${message}")`
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table inserted");
        });

    })
    socket.on('esp/fan', (message) => {
        client.publish('esp/fan', message);

        var sql =
            `INSERT INTO 
            actions (time, name, action) 
            VALUES 
            ("${getStringDateTime()}", "Fan", "${message}")`
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table inserted");
        });
    })
})

// MQTT
const client = mqtt.connect('mqtt://localhost:1884');
// const client = mqtt.connect({
//     protocol: '',
//     host: '',
//     port: 1884,
//     username: '',
//     password: ''
// });

client.on('connect', () => {
    console.log('MQTT connected');
});

client.on('error', (error) => {
    console.log(error);
});

client.on('message', (topic, message) => {
    var rawMess = message.toString()
    var newMess = rawMess.substring(0, rawMess.length - 1) + `,"time": "${new Date().toLocaleString()}"}`

    try {
        var jsonData = JSON.parse(rawMess)

        var sql =
            `INSERT INTO 
            sensors (time, temperature, humidity, light) 
            VALUES 
            ("${getStringDateTime()}", "${jsonData.temperature}", "${jsonData.humidity}", "${jsonData.light}")`
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table inserted");
        });

        io.emit(topic, newMess)
    } catch (error) {
        console.log('1 of them is nan')
    }
});

client.subscribe('esp/sensor');


function getStringDateTime() {
    var n = new Date();
    var month = n.getMonth() + 1;
    var result = n.getFullYear() + "-" + month + "-" + n.getDate() + " " + n.getHours() + ":" + n.getMinutes() + ":" + n.getSeconds();
    return result;
}