const express = require('express')
const route = express.Router()

const uuid = require('uuid')
const db = require('../db/db')

route.get('/', (req, res) => {
    res.json({
        msg: 'ENTER API'
    })
})

route.get('/user', (req, res)=>{
    const db_ = db.read()
    if(db_.user){
        res.json({
            user:db_.user
        })
    }else{
        res.json({
            msg:'EMPTY'
        })
    }
})

route.post('/user', (req, res)=>{
    const db_ = db.read()
    const {name, age} = req.body
    const temp = {
        id:uuid.v4(),
        name:name,
        age:age,
        timestamp:new Date()
    }
    if(db_.user){
        db_.user.push(temp)
    } else{
        db_.user = [temp]
    }
    db.write(db_)
    res.json({
        msg:'CREATE NEW USER COMPLETE!'
    })
})

route.delete('/user', (req, res)=>{
    let db_ = db.read()
    const {id} = req.body
    if(db_.user){
        db_ = {user:db_.user.filter(el=>el.id!==id)}
        db.write(db_)
        res.json({
            msg:'DELETE'
        })
    }else{
        res.json({
            err:'NO DATA.'
        })
    }
})

route.put('/user/:id', (req, res)=>{
    let db_ = db.read()
    const {id} = req.params
    const {name, age} = req.body
    db_ = {user:db_.user.map(el=>{
        if(el.id === id){
            el = {
                ...el,
                name:name?name:el.name,
                age:age?age:el.age

            }
        }
        return el
    })}
    db.write(db_)
    res.json({
        msg:'UPDATE'
    })
})


module.exports = route