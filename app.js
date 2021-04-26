const express = require('express')
const app = express()

const colors = require('colors')
require('dotenv').config()
const session = require('express-session');


PORT = process.env.PORT || 5555

app.use(express.json())
app.use(express.urlencoded())
app.use(session({
    secret:'SECRET',
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:6000
    }
}))

app.get('/', (req, res)=>{
    if(req.session.count){
        req.session.count++
        res.json({
            msg:`Enter this API: ${req.session.count} times`
        })
    }else{
        req.session.count=1
        res.json({msg:'HelloWorld'})
    }
})

const main_route = require('./Routes/routes')
app.use('/api/', main_route)



app.listen(PORT, console.log(`RUN IN PORT:${PORT}`.black.bgGreen))


