var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const mongoose = require('mongoose');


const dbcunnect = async () => {
    const mongoose = require('mongoose');
    await mongoose.connect('mongodb+srv://office:nxrO7CJqVJ74hpqW@cluster0.kcyhikf.mongodb.net/?retryWrites=true&w=majority');
    console.log('Db is cunnect')
}

const schema = new mongoose.Schema({
    companiname: {
        type: String
    },
    companilocation: {
        type: String
    },
    companiposation: {
        type: String
    },
    companicountry: {
        type: String
    },
    jobtype: {
        type: String
    }
});
const Tank = mongoose.model('users', schema);



app.post('/post', async (req, res) => {

    try {
        const newPost = Tank({
            companiname: req.body.companiname,
            companilocation: req.body.companilocation,
            companiposation: req.body.companiposation,
            companicountry: req.body.companicountry,
            jobtype: req.body.jobtype
        })
        await newPost.save()
    } catch (error) {

    }
    res.send(req.body)
})

app.get('/alljoblist', async (req, res) => {
    try {
        const allData = await Tank.find({})
        if (allData) {
            res.send(allData)
        }
    } catch (error) {

    }
})

app.listen(4000, async () => {
    await dbcunnect();
    console.log('locaal host run 4000')
})