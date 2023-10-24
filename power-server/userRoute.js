const express = require('express')
const router = express.Router()

const { Users } = require('./Model')
/*
const crypto = require('crypto');
const jwt = require('jsonwebtoken')
*/

router.get('/', (req, res) => {
    res.json({
        err: false,
        message: 'user route available'
    })
})

router.get('/getall', async (req, res) => {

    try {
        let userlist = await Users.findAll()
        res.json(userlist)
    } catch (err) {
        console.log(err)
    }
})

router.post('/auth', async (req, res) => {

    console.log(req.body)
    const { email, password } = req.body

    try {
        const user = await Users.findOne( {where: {email: email}}) 
        if (user == null || user == undefined || !user) {
            res.json({
                err:true,
                message:'user not found'
            })
            return
        }

        if (user.password != password) {
            res.json({
                err:true,
                message:'email or password does not match'
            })
            return
        } 

        res.json({
            err:false,
            messag:'authentication success'
        })

    } catch (err) {
        console.log(err)
    }
})

module.exports = router;
