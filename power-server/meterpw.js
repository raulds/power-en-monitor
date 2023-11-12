const express = require('express')
const { Sequelize } = require('sequelize')
const { Op } = Sequelize
const router = express.Router()


const { Meter, Samples, Users, Dashboard, Powerdot } = require('./Model')

router.post('/powerdata/', async (req, res) => {

    const { meterid, start, end } = req.body
    console.log('received data')
    console.log(meterid, start, end)

    const foundmeters = await Meter.findAll( {where: { id : meterid}});

    console.log(foundmeters)
    if (!(foundmeters.length > 0)) {
        console.log('no meter found')
        res.json({err: true, msg: 'the selected meter does not exist in the database'})
    }

    //let startdate = new Date(2023,5,1,0,0,1)
    //let enddate = new Date(2023,11,30,23,59,59)

    let startdate = new Date(start.year, start.month, start.day,
                                start.hour, start.minute, start.sec)

    let enddate = new Date(end.year, end.month, end.day,
                            end.hour, end.minute, end.sec)

    console.log('-')
    console.log('-')
    console.log(`start date: ${startdate}`)
    console.log(`end date: ${enddate}`)

    console.log('-')
    console.log('-')
    console.log('-')

    let powerdata = await Powerdot.findAll({
        where: {
            meterId: meterid,
            createdAt : {
                [Op.between]: [startdate, enddate]
            }
        }
    })
    
    res.json({
        err: false,
        message: 'default response',
        data: powerdata
    })
})

router.post('/power/', async (req, res) => {

    const { meterid, start, end } = req.body
    console.log('received data')
    console.log(meterid, start, end)

    const foundmeters = await Meter.findAll( {where: { id : meterid}});

    console.log(foundmeters)
    if (!(foundmeters.length > 0)) {
        console.log('no meter found')
        res.json({err: true, msg: 'the selected meter does not exist in the database'})
    }

    //let startdate = new Date(2023,5,1,0,0,1)
    //let enddate = new Date(2023,11,30,23,59,59)

    let startdate = new Date(start.year, start.month, start.day,
                                start.hour, start.minute, start.sec)

    let enddate = new Date(end.year, end.month, end.day,
                            end.hour, end.minute, end.sec)

    console.log('-')
    console.log('-')
    console.log(`start date: ${startdate}`)
    console.log(`end date: ${enddate}`)

    console.log('-')
    console.log('-')
    console.log('-')

    let powerdata = await Powerdot.findAll({
        where: {
            meterId: meterid,
            createdAt : {
                [Op.between]: [startdate, enddate]
            }
        }
    })

    let activepower = 0
    let reactivepower = 0 
    let apparentpower = 0
    let powerfactor = 0 

    powerdata.forEach( sample => {
        activepower += sample.active_power
        reactivepower += sample.reactive_power
        apparentpower += sample.apparent_power 
        powerfactor += sample.power_factor
    })

    let avgpf = powerfactor / powerfactor.length

    console.log('----')
    console.log('----')
    console.log('total powers, active, reactive, apparent, avg pf')
    console.log(activepower)
    console.log(reactivepower)
    console.log(apparentpower)
    console.log(avgpf)
    console.log('----')
    console.log('----')
    console.log('----')

    
    res.json({
        err: false,
        message: 'default response',
        data: {
            active_power: activepower,
            reactive_power: reactivepower,
            apparent_power: apparentpower,
            avg_pf: avgpf
        }
    })
})


module.exports = router;