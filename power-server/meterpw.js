const express = require('express')
const moment = require('moment-timezone')

const { Sequelize } = require('sequelize')
const { Op } = Sequelize
const router = express.Router()

const { Meter, Samples, Users, Dashboard, Powerdot } = require('./Model')

router.post('/powerbymeter/:meterId', async (req, res) => {

    const meterid = req.params.meterId
    const { type, end, begin } = req.body

    //let startDate = new Date(2023, 10, 18)
    //let endDate = new Date(2023, 10, 18)
    let startDate = new Date(begin)
    let endDate = new Date(end)

    /*
    console.log(meterid, type)
    console.log('-----------------------')
    console.log(startDate)
    console.log(endDate)
    */
    
    const foundmeters = await Meter.findAll( {where: { id : meterid}});

    if (!(foundmeters.length > 0)) {
        console.log('no meter found')
        res.json({err: true, msg: 'the selected meter does not exist in the database'})
    }

    switch(type) {
        case 'today':
            startDate.setHours(0, 0, 0, 0)
            endDate.setHours(23, 59, 59, 999)
        break

        case 'lastweek':
            endDate.setHours(23, 59, 59, 999)
            startDate.setDate(endDate.getDate() - 7)
            startDate.setHours(0, 0, 0, 0)
        break;

        case 'lastmonth':
            endDate.setHours(23, 59, 59, 999)
            startDate.setDate(endDate.getDate() - 30)
            startDate.setHours(0, 0, 0, 0)
        break;

        case 'timeslot':
            startDate.setHours(0, 0, 0, 0)
            endDate.setHours(23, 59, 59, 999)
        break;
    }

    let powerdata = await Powerdot.findAll({
        where: {
            meterId: meterid,
            createdAt : {
                [Op.between]: [startDate, endDate]
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

    /*
    console.log('----')
    console.log('total powers, active, reactive, apparent, avg pf')
    console.log(activepower)
    console.log(reactivepower)
    console.log(apparentpower)
    console.log(avgpf)
    console.log('----')
    */

    res.json({
        err: false,
        message: 'default response',
        meterdata: {
            meterId: meterid,
            active_power: activepower,
            reactive_power: reactivepower,
            apparent_power: apparentpower,
            avg_pf: avgpf
        }
    })
})


router.post('/powerdata/:meterId', async (req, res) => {
    const meterid = req.params.meterId
    const { type, end, begin } = req.body

    let startDate = new Date(begin)
    let endDate = new Date(end)

    const foundmeters = await Meter.findAll( {where: { id : meterid}});

    if (!(foundmeters.length > 0)) {
        console.log('no meter found')
        res.json({err: true, msg: 'the selected meter does not exist in the database'})
    }

    switch(type) {
        case 'today':
            startDate.setHours(0, 0, 0, 0)
            endDate.setHours(23, 59, 59, 999)
        break

        case 'lastweek':
            endDate.setHours(23, 59, 59, 999)
            startDate.setDate(endDate.getDate() - 7)
            startDate.setHours(0, 0, 0, 0)
        break;

        case 'lastmonth':
            endDate.setHours(23, 59, 59, 999)
            startDate.setDate(endDate.getDate() - 30)
            startDate.setHours(0, 0, 0, 0)
        break;

        case 'timeslot':
            startDate.setHours(0, 0, 0, 0)
            endDate.setHours(23, 59, 59, 999)
        break;
    }

    let powerdata = await Powerdot.findAll({
        where: {
            meterId: meterid,
            createdAt : {
                [Op.between]: [startDate, endDate]
            }
        }
    })


    res.json({
        err: false,
        message: 'default response',
        meterId: meterid,
        meterdata: powerdata 
    })
})

router.post('/dailypowerdata/:meterId', async (req, res) => {
    const meterid = req.params.meterId
    const { type, end, begin } = req.body

    let startDate = new Date(begin)
    let endDate = new Date(end)

    const foundmeters = await Meter.findAll( {where: { id : meterid}});

    if (!(foundmeters.length > 0)) {
        console.log('no meter found')
        res.json({err: true, msg: 'the selected meter does not exist in the database'})
    }

    switch(type) {
        case 'today':
            startDate.setHours(0, 0, 0, 0)
            endDate.setHours(23, 59, 59, 999)
        break

        case 'lastweek':
            endDate.setHours(23, 59, 59, 999)
            startDate.setDate(endDate.getDate() - 7)
            startDate.setHours(0, 0, 0, 0)
        break;

        case 'lastmonth':
            endDate.setHours(23, 59, 59, 999)
            startDate.setDate(endDate.getDate() - 30)
            startDate.setHours(0, 0, 0, 0)
        break;

        case 'timeslot':
            startDate.setHours(0, 0, 0, 0)
            endDate.setHours(23, 59, 59, 999)
        break;
    }

    // plate variables
    let idate = new Date(endDate) 
    let dailypowerdata = []
    let activepower = 0

    let idatebegin = new Date();
    let idateend = new Date();
    // iterating over days
    while (idate > startDate) {

        // updating idate begin and end
        //idatebegin.setDate( idate.getDate())
        //idateend.setDate( idate.getDate()) 
        idatebegin = new Date(idate)
        idateend = new Date(idate)

        // seeting first and last hour of an date
        idatebegin.setHours(0,0,0,0)
        idateend.setHours(23, 59, 59, 999)

        console.log('---date baoundaries---')
        console.log(idatebegin)
        console.log(idateend)
        
        let powerdata = await Powerdot.findAll({
            where: {
                meterId: meterid,
                createdAt : {
                    [Op.between]: [idatebegin, idateend]
                }
            }
        })

        activepower = 0
        for ( const power of powerdata) {
            console.log(power.active_power)
            activepower += power.active_power
        }

        dailypowerdata.push({
            label: idate.toString(),
            value: activepower 
        })
        
        //console.log(dailypowerdata)

        // fixing iterator
        idate.setDate(idate.getDate() - 1)
    }

    //console.log(dailypowerdata)

    res.json({
        err: false,
        message: 'default response',
        meterId: meterid,
        meterdata: dailypowerdata 
    })
})


router.post('/powerbyboard/:boardId', async (req, res) => {

    const boardid = req.params.boardId
    const { type, end, begin } = req.body

    let startDate = new Date(begin)
    let endDate = new Date(end)

    /*
    console.log('-----------------------')
    console.log(boardid, type)
    console.log('-----------------------')
    console.log(startDate)
    console.log(endDate)
    console.log('-----------------------')
    */
    
    const foundmeters = await Meter.findAll( {where: { dashboardId : boardid}});

    if (!(foundmeters.length > 0)) {
        console.log('no meter found')
        res.json({err: true, msg: 'the current dashboard has no meters registered'})
    }

    switch(type) {
        case 'today':
            startDate.setHours(0, 0, 0, 0)
            endDate.setHours(23, 59, 59, 999)
        break

        case 'lastweek':
            endDate.setHours(23, 59, 59, 999)
            startDate.setDate(endDate.getDate() - 7)
            startDate.setHours(0, 0, 0, 0)
        break;

        case 'lastmonth':
            endDate.setHours(23, 59, 59, 999)
            startDate.setDate(endDate.getDate() - 30)
            startDate.setHours(0, 0, 0, 0)
        break;

        case 'timeslot':
            startDate.setHours(0, 0, 0, 0)
            endDate.setHours(23, 59, 59, 999)
        break;
    }

    let activepower = 0
    let reactivepower = 0 
    let apparentpower = 0

//    foundmeters.forEach ( async meter => {
    
    for ( const meter of foundmeters) {

        let powerdata = await Powerdot.findAll({
            where: {
                meterId: meter.id,
                createdAt : {
                    [Op.between]: [startDate, endDate]
                }
            }
        })
        
        console.log(powerdata[0])

        powerdata.forEach( sample => {
            activepower += sample.active_power
            reactivepower += sample.reactive_power
            apparentpower += sample.apparent_power 
        })
    //})
    }
    
    /*
    console.log('----')
    console.log('total powers, active, reactive, apparent, avg pf')
    console.log(activepower)
    console.log(reactivepower)
    console.log(apparentpower)
    console.log('----')
    */


    res.json({
        err: false,
        message: 'successfully got board consumed power',
        meterdata: {
            boardid: boardid,
            active_power: activepower,
            reactive_power: reactivepower,
            apparent_power: apparentpower,
        }
    })
})

router.post('/boardpowerpercent/:boardId', async (req, res) => {

    const boardid = req.params.boardId
    const { type, end, begin } = req.body

    let startDate = new Date(begin)
    let endDate = new Date(end)

    console.log('-----------------------')
    console.log(boardid, type)
    console.log('-----------------------')
    console.log(startDate)
    console.log(endDate)
    console.log('-----------------------')
    
    const foundmeters = await Meter.findAll( {where: { dashboardId : boardid}});

    if (!(foundmeters.length > 0)) {
        console.log('no meter found')
        res.json({err: true, msg: 'the current dashboard has no meters registered'})
    }

    switch(type) {
        case 'today':
            startDate.setHours(0, 0, 0, 0)
            endDate.setHours(23, 59, 59, 999)
        break

        case 'lastweek':
            endDate.setHours(23, 59, 59, 999)
            startDate.setDate(endDate.getDate() - 7)
            startDate.setHours(0, 0, 0, 0)
        break;

        case 'lastmonth':
            endDate.setHours(23, 59, 59, 999)
            startDate.setDate(endDate.getDate() - 30)
            startDate.setHours(0, 0, 0, 0)
        break;

        case 'timeslot':
            startDate.setHours(0, 0, 0, 0)
            endDate.setHours(23, 59, 59, 999)
        break;
    }

    let activepower = 0
    let reactivepower = 0 
    let apparentpower = 0

//    foundmeters.forEach ( async meter => {
    
    let powerbymeter = []
    for ( const meter of foundmeters) {

        let powerdata = await Powerdot.findAll({
            where: {
                meterId: meter.id,
                createdAt : {
                    [Op.between]: [startDate, endDate]
                }
            }
        })
        
        console.log(powerdata[0])

        activepower = 0
        reactivepower = 0
        apparentpower = 0
        powerdata.forEach( sample => {
            activepower += sample.active_power
            reactivepower += sample.reactive_power
            apparentpower += sample.apparent_power 
        })

        powerbymeter.push({
            name: meter.name,
            value: parseFloat( (activepower / 1000).toFixed(2) )
        })
        /*
        powerbymeter.push( { 
                    meterid: meter.id,
                    active_power: activepower,
                    reactive_power: reactivepower, 
                    apparent_power: apparentpower })
                    */
    //})
    }
    
    console.log('----')
    console.log(powerbymeter)
    console.log('----')


    res.json({
        err: false,
        message: 'successfully got board consumed power',
        powerbymeter: powerbymeter 
    })
})

/*
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

*/

module.exports = router;