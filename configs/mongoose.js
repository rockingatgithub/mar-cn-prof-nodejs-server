const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/first_crud_app')


const db = mongoose.connection

db.once('open', (err) => {
    if(err){
        console.log(err)
        return;
    }
    console.log('Successfully connected to DB😀')
})

module.exports = db;