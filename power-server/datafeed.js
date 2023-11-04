const { Meter, Samples, Users, Dashboard} = require('./Model')
const fsHandler = require('fs')

main()

async function main () {

    //await Samples.destroy({truncate: {cascade:true}})
    //await Meter.destroy({truncate: {cascade:true}})
    //let query = 'ALTER TABLE meters AUTO_INCREMENT=1'
    //await connection.query(query, {plain: false, raw: false})

    /*
    let rawdata = await fsHandler.readFileSync('./userdata.json')
    let userdata = JSON.parse(rawdata)

    try {
        const result = await Users.bulkCreate(userdata)
        console.log(result)
    } catch(error) {
        console.log(error)
    }
    */

    let rawboarddata = await fsHandler.readFileSync('./boarddata.json')
    let boarddata = JSON.parse(rawboarddata)

    try {
        const result = await Dashboard.bulkCreate(boarddata)
        console.log(result)
    } catch(error) {
        console.log(error)
    }
    
    let rawmeterdata = await fsHandler.readFileSync('./meterdata.json')
    let meterdata = JSON.parse(rawmeterdata)

    try {
        const result = await Meter.bulkCreate(meterdata)
        console.log(result)
    } catch(error) {
        console.log(error)
    }
    

    /*
    let rawsampledata = await fsHandler.readFileSync('./sampledata.json')
    let sampledata = JSON.parse(rawsampledata)

    try {
        const result = await Samples.bulkCreate(sampledata)
        console.log(result)
    } catch(error) {
        console.log(error)
    }
    */
}