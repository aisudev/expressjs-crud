const fs = require('fs')

function readDB(){
    let raw = fs.readFileSync(__dirname+'/db.json')
    let db = JSON.parse(raw)
    return(db)
}

function writeDB(data){
    let temp = JSON.stringify(data)
    fs.writeFileSync(__dirname+'/db.json', temp)
}

module.exports = { 
    read:readDB,
    write:writeDB
}