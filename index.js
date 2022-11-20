const express = require('express')
const PORT = 8000
const app = express()
const db = require('./configs/mongoose')
const Student = require('./models/student')
const passport = require('./configs/passportLocal')

app.use(express.static('assets'))
app.use(express.urlencoded())
app.use(express.json())

passport.initialize()

app.post('/login', passport.authenticate('local', {session: false})  , (req, res) => {

    console.log(req.user)
    if(req.user){
        return res.status(200).json({
            data: req.user
        })
    }
    return res.status(401).json({
        message: "Unauthorized!"
    })
})


app.post('/addStudent', (req, res) => {

    Student.create(req.body, (err, doc) => {

        if(err){
            console.log(err)
            return res.status(500).json({
                data: "Error in server!"
            })
        }

        return res.status(200).json({
            data: doc
        })

    })

})

app.get('/fetchStudent', (req, res) => {

    Student.find({}, (err, doc) => {

        if(err){
            console.log(err)
            return res.status(500).json({
                data: "Error in server!"
            })
        }

        return res.status(200).json({
            data: doc
        })

    })

})

app.put('/modifyStudent', async (req, res) => {

    console.log(req.query.id, req.body)

    try{

        const student = await Student.findByIdAndUpdate(req.query.id, req.body, {new: true} )

        return res.status(200).json({
            data: student
        })

    }catch(err){

        return res.status(500).json({
            message: "Error occured!"
        })

    }

})

app.patch('/updateStudent/:id', async (req, res) => {


    try{

        const student = await Student.findById(req.params.id)

        if(student){
            student.name = req.body.name
            await student.save()
            return res.status(200).json({
                data: student
            })
        }
        return res.status(401).json({
            message: "Document not found!"
        })

    }catch(err){
        return res.status(500).json({
            message: "Error occured!"
        })        
    }

    
})





app.listen(PORT, (err) => {
    if(err){
        console.log(err)
        return;
    }
    console.log("Server is running 😀")
})