function getStringDateTime() {
    var n = new Date();
    var month = n.getMonth() + 1;
    var result = n.getFullYear() + "-" + month + "-" + n.getDate() + " " + n.getHours() + ":" + n.getMinutes() + ":" + n.getSeconds();
    return result;
}

function getAllSensorValues(con, res) {
    var sql = `SELECT * FROM sensors`
    con.query(sql, function (err, result) {
        if (err) throw err;
        return res.json(result)
    });
}

function getAllActionLogs(con, res) {
    var sql = `SELECT * FROM actions`
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result)
    });
}

function addSensor(con, temp, humi, light) {
    var sql =
        `INSERT INTO 
        sensors (createdAt, temperature, humidity, light) 
        VALUES 
        ('"${getStringDateTime()}"', '"${temp}"', '"${humi}"', '"${light}"')`
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table inserted");
        console.log(getStringDateTime() + " " + temp + " " + humi + " " + light);
    });
}

function addActive(con, idActive) {
    var sql =
        `INSERT INTO 
        actions (createdAt, idActive) 
        VALUES 
        ('"${getStringDateTime()}"', '"${idActive}"')`
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table inserted");
        console.log(getStringDateTime() + " " + idActive);
    });
}

module.exports = createTable, getAllSensorValues, getAllActionLogs, addSensor, addActive