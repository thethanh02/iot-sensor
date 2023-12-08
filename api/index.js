import express from 'express';
import pg from 'pg';
import moment from 'moment';
import mqtt from 'mqtt';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from "dotenv";

var app = express(),
    server = http.createServer(app);

dotenv.config();
app.use(cors())
app.use(bodyParser.json());

var port = '5678'
server.listen(port, function () {
    console.log('Server listening on port ' + port)
})

// ------------------ Initialize------------------ 
// Kết nối CSDL
const { Pool } = pg;
const con = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})
const connectToDB = async () => {
  try {
    await con.connect();
    await con.query(`CREATE TABLE IF NOT EXISTS sensors(
                      id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
                      time timestamp not null, 
                      temperature float not null, 
                      humidity float not null, 
                      light float not null,
                      gas float not null);`)
    await con.query(`CREATE TABLE IF NOT EXISTS actions(
                      id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
                      time timestamp not null, 
                      name text not null,
                      action text not null);`)

  } catch (err) {
    console.log(err);
  }
};
connectToDB();

app.get('/api', function (req, res) {
    res.json({"test": "test"});
})
// ------------------ Api------------------ 
// Lấy 10 giá trị CẢM BIẾN gần nhất
// Hay lấy giá trị CẢM BIẾN 10 lần cuối đo được
app.get('/api/lastest_sensors', function (req, res) {
    var num = 0
    var sql1 = `SELECT COUNT(id) AS numberofsensors FROM sensors`
    con.query(sql1, function (err, result) {
        if (err) throw err;
        num = result.rows[0].numberofsensors

        num = num >= 10 ? num - 10 : num
        var sql = `SELECT * FROM sensors LIMIT 10 OFFSET ${num}`
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.json(result.rows)
        });
    });
})

// Lấy tổng số trang của CẢM BIẾN
// Mỗi trang 20 giá trị, nên có 200 giá trị thì có 200/20 = 10 trang
app.get('/api/total_pages_sensors', function (req, res) {
    var params = req.query
    var varPerPage = 20
    if (Object.keys(req.query).length === 0) {
        var num = 0
        var sql1 = `SELECT COUNT(id) AS numberofsensors FROM sensors`
        con.query(sql1, function (err, result) {
            if (err) throw err;
            num = result.rows[0].numberofsensors

            res.json(Math.ceil(num / varPerPage) - 1)
        });
    } else if (params.date_from && params.date_to) {
        var datetime_from = moment(params.date_from).format('yyyy-MM-DD')
        var datetime_to = moment(params.date_to).format('yyyy-MM-DD')

        var sql = `SELECT COUNT(id) AS numberofsensors FROM sensors
            where time between '${datetime_from}' and '${datetime_to}'`

        con.query(sql, function (err, result) {
            if (err) throw err;
            num = result.rows[0].numberofsensors

            res.json(Math.ceil(num / varPerPage) - 1)
        });
    } else {
        res.json(1)
    }
})

// Lấy danh sách giá trị CẢM BIẾN (theo trang, theo khoảng thời gian)
app.get('/api/list_sensors', function (req, res) {
    var params = req.query
    var varPerPage = 20
    var varSort = (params.sorted == 1 ? 'desc' : 'asc')
    if (Object.keys(req.query).length <= 2) {
        var sql = `SELECT * FROM sensors 
            order by time ${varSort}
            limit ${varPerPage} offset ${params.page ? varPerPage * (params.page) : 0};`

        con.query(sql, function (err, result) {
            if (err) throw err;
            res.json(result.rows)
        });
    } else if (params.date_from && params.date_to) {
        var datetime_from = moment(params.date_from).format('yyyy-MM-DD')
        var datetime_to = moment(params.date_to).format('yyyy-MM-DD')

        var sql = `SELECT * FROM sensors 
            where time between '${datetime_from}' and '${datetime_to}'
            order by time ${varSort}
            limit ${varPerPage} offset ${params.page ? varPerPage * (params.page) : 0};`

        con.query(sql, function (err, result) {
            if (err) throw err;
            res.json(result.rows)
        });
    } else {
        res.json(1)
    }
})

// Lấy tổng số trang của HÀNH ĐỘNG BẤM NÚT
app.get('/api/total_pages_actions', function (req, res) {
    var params = req.query
    var varPerPage = 10
    if (Object.keys(req.query).length === 0) {
        var num = 0
        var sql1 = `SELECT COUNT(id) AS NumberOfActions FROM actions`
        con.query(sql1, function (err, result) {
            if (err) throw err;
            num = result.rows[0].numberofactions

            res.json(Math.ceil(num / varPerPage) - 1)
        });
    } else if (params.date_from && params.date_to) {
        var datetime_from = moment(params.date_from).format('yyyy-MM-DD')
        var datetime_to = moment(params.date_to).format('yyyy-MM-DD')

        var sql = `SELECT COUNT(id) AS NumberOfActions FROM actions
            where time between '${datetime_from}' and '${datetime_to}'`

        con.query(sql, function (err, result) {
            if (err) throw err;
            num = result.rows[0].numberofactions

            res.json(Math.ceil(num / varPerPage) - 1)
        });
    } else {
        res.json(1)
    }
})

// Lấy danh sách giá trị HÀNH ĐỘNG BẤM NÚT (theo trang, theo khoảng thời gian)
app.get('/api/list_actions', function (req, res) {
    var params = req.query
    var varPerPage = 10
    var varSort = (params.sorted == 1 ? 'desc' : 'asc')
    if (Object.keys(req.query).length <= 2) {
        var sql = `SELECT * FROM actions 
            order by time ${varSort}
            limit ${varPerPage} offset ${params.page ? varPerPage * (params.page) : 0};`

        con.query(sql, function (err, result) {
            if (err) throw err;
            res.json(result.rows)
        });
    } else if (params.date_from && params.date_to) {
        var datetime_from = moment(params.date_from).format('yyyy-MM-DD')
        var datetime_to = moment(params.date_to).format('yyyy-MM-DD')

        var sql = `SELECT * FROM actions 
            where time between '${datetime_from}' and '${datetime_to}'
            order by time ${varSort}
            limit ${varPerPage} offset ${params.page ? varPerPage * (params.page) : 0};`

        con.query(sql, function (err, result) {
            if (err) throw err;
            res.json(result.rows)
        });
    } else {

    }
})

// ------------------ MQTT------------------ 
const client = mqtt.connect('mqtt://localhost:1884');
// const client = mqtt.connect({
//     protocol: '',
//     host: '',
//     port: 1884,
//     username: '',
//     password: ''
// });

// Kết nối MQTT
client.on('connect', () => {
    console.log('MQTT connected');
});
client.on('error', (error) => {
    // console.log(error);
});

// Xử lý message nhận được khi subcribe 1 topic
// Ví dụ subcribe topic 'esp/sensor' ở dưới, ta xử lý giá trị CẢM BIẾN nhận được từ MQTT trong hàm này
client.on('message', (topic, message) => {
    // Message nhần được từ MQTT
    var rawMess = message.toString()
    try {
        // Chuyển tin nhắn nhận được sang JSON
        var jsonData = JSON.parse(rawMess)

        // Lưu các giá trị CẢM BIẾN vào CSDL
        var sql =
            `INSERT INTO 
            sensors (time, temperature, humidity, light) 
            VALUES 
            ("${getStringDateTime()}", "${jsonData.temperature}", "${jsonData.humidity}", "${jsonData.light}")`
        con.query(sql, function (err, result) {
            if (err) throw err;
        });
    } catch (error) {
        console.log('1 of them is nan')
    }
});
// Subscribe topic 'esp/sensor' để lấy giá trị CẢM BIẾN
client.subscribe('esp/sensor');

// Lưu HÀNH ĐỘNG BẤM NÚT vào CSDL
app.post('/api/action/save', function (req, res) {
    var myAction = req.body;
    client.publish(`esp/${myAction.name.toLowerCase()}`, myAction.message);
    var sql =
        `INSERT INTO 
        actions (time, name, action) 
        VALUES 
        ('${getStringDateTime()}', '${myAction.name}', '${myAction.action}')`
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.json({ message: 'Ok' });
    });
})

// Lấy datetime format theo dạng MySQL
function getStringDateTime() {
    var n = new Date();
    var month = n.getMonth() + 1;
    var result = n.getFullYear() + "-" + month + "-" + n.getDate() + " " + n.getHours() + ":" + n.getMinutes() + ":" + n.getSeconds();
    return result;
}

export default app;