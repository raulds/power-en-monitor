const express = require('express'); 
const cors =  require('cors')
const app = express();
const port = 3000;

const axios = require('axios')
const crypto = require('crypto')

const { Meter, Samples, Users, Dashboard } = require('./Model')

const userRoute = require('./userRoute');
const meterpw = require('./meterpw')


const { TuyaContext } = require('@tuya/tuya-connector-nodejs')


app.use(cors())
app.use(express.static('public'));
app.use(express.json())

// adding a route midleware to authentication
app.use('/users/', userRoute)
app.use('/meterpw/', meterpw)

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});


// Add another route
app.get('/about', (req, res) => {
    res.send('About page');
});

app.get('/meters', async (req, res) => {

    try {
        const meters = await Meter.findAll()
        console.log(meters)
        res.json(meters)
    } catch (error) {
        console.log(error)
        res.status(500).json({ err: true, message:'failed to get meter list' })
    }
});

app.get('/boards', async (req, res) => {

    try {
        const boards = await Dashboard.findAll()
        console.log(boards)
        res.json(boards)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message:'failed to get dashboard list' })
    }
});

app.get('/samples/:meterId', async (req, res) => {
    const meterid = req.params.meterId
    try {
        const samples = await Samples.findAll({ where: {meterId: meterid }});
        console.log(samples)
        res.json(samples)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message:'failed to get samples from meter' })
    }
});

app.get('/samples/voltage/:meterId', async (req, res) => {
    const meterid = req.params.meterId
    try {
        const samples = await Samples.findAll({ where: {meterId: meterid },
            attributes: ['updatedAt', 'voltage']});
        res.json(samples)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message:'failed to get samples from meter' })
    }
});

app.get('/samples/current/:meterId', async (req, res) => {
    const meterid = req.params.meterId
    try {
        const samples = await Samples.findAll({ where: {meterId: meterid },
            attributes: ['updatedAt', 'current']});
        res.json(samples)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message:'failed to get samples from meter' })
    }
});

app.get('/samples/powerfct/:meterId', async (req, res) => {
    const meterid = req.params.meterId
    try {
        const samples = await Samples.findAll({ where: {meterId: meterid },
            attributes: ['updatedAt', 'power_factor']});
        res.json(samples)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message:'failed to get samples from meter' })
    }
});

app.get('/samples/actpower/:meterId', async (req, res) => {
    const meterid = req.params.meterId
    try {
        const samples = await Samples.findAll({ where: {meterId: meterid },
            attributes: ['updatedAt', 'active_power']});
        res.json(samples)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message:'failed to get samples from meter' })
    }
});

app.get('/samples/rctpower/:meterId', async (req, res) => {
    const meterid = req.params.meterId
    try {
        const samples = await Samples.findAll({ where: {meterId: meterid },
            attributes: ['updatedAt', 'reactive_power']});
        res.json(samples)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message:'failed to get samples from meter' })
    }
});

app.get('/samples/apppower/:meterId', async (req, res) => {
    const meterid = req.params.meterId
    try {
        const samples = await Samples.findAll({ where: {meterId: meterid },
            attributes: ['updatedAt', 'apparent_power']});
        res.json(samples)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message:'failed to get samples from meter' })
    }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

/*
const access_id = 'xchcrs8jtr7fs5gejfvf'
const access_key = 'e84e106a27da42d682f8848869968db7'
const sign_method = 'HMAC-SHA256'
const project_code = 'p1695607998369jhxyhw'
const baseurl = 'https://openapi.tuyaus.com'

const endpoint = '/v2.0/cloud/thing/'
*/

function sleep(time) {
    return new Promise(resolve=>setTimeout(resolve, time))
}

const context = new TuyaContext( {
        baseUrl:'https://openapi.tuyaus.com',
        accessKey:'xchcrs8jtr7fs5gejfvf',
        secretKey:'e84e106a27da42d682f8848869968db7',
    })


const main = async () => {
    console.log('starging the data collector')

    let device_id = 'vdevo169560839264911'
    const devicedetail = await context.device.detail({
        device_id: device_id
    })
    if(!devicedetail.success) {
        new Error()
    }
    console.log('Device Details: ', devicedetail)

    let registeredMeters = await Meter.findAll()
    
    while( registeredMeters ) {
        await sleep(10000)
        
        registeredMeters = await Meter.findAll()
        // fetch all tuya devices registered on the database

        // polling all tuya devices on the array
        registeredMeters.forEach ( async meter => {
            console.log(meter.name)

            // check if its a tuya device
            if (!meter.meterkey) {
                return
            }

            /*
            console.log('fecthing data from tuya: ', meter.meterkey, meter.name)
            device_id = meter.meterkey 
            */
            /*
            commands = await context.request({
                path: `/v2.0/cloud/thing/${device_id}/shadow/properties`,
                method: 'GET',
                body: {}
            })
            */
            context.request({
                path: `/v2.0/cloud/thing/${device_id}/shadow/properties`,
                method: 'GET',
                body: {}
            }).then((data) => {
                console.log('debug')
                console.log('data from tuya: ', meter.meterkey, meter.name)
                if (meter.metermodel === 'vdevo') {
                    console.log(data)
                    /*
                    let meterData = {
                        voltage: data.result.properties[5].value,
                        current: data.result.properties[3].value ,
                        power: data.result.properties[4].value,
                    }
                    */
                }
                console.log(meterData)
            }).catch((error) => {
                console.log('failed to get one sample from the meter')
                console.log(error)
            })

            /*
            if (!commands.success){
                console.log('failed to fetch meter measurement info')
                console.log(meter.metername)
                console.log(meter.meterkey)
                return
            }

            //    JSON.stringify(commands, null, 2)
            let meterData = {
                voltage: null,
                current: null,
                power: null,
            }

            if (meter.metermodel === 'vdevo') {
                meterData.voltage = commands.result.properties[5].value
                meterData.current = commands.result.properties[3].value
                meterData.power = commands.result.properties[4].value
                console.log(meterData)
            }

            if (meterData.voltage == null) {
                // no data acquired fetching tuya
                console.log('no data acquired fetching tuya')
                console.log(meter.metername)
                console.log(meter.meterkey)
                return
            }

            await Samples.create({
                meterId: meter.id,
                voltage: meterData.voltage,
                current: meterData.current,
                active_power: meterData.power
            })
            */
        })
    }

    /*
    let params = {}
    let timestamp = Math.floor(Date.now() / 1000)
    let tosign = `${access_id}${timestamp}${baseurl}${JSON.stringify(params)}`

    let signature = crypto
    .createHmac('sha256', access_key)
    .update(tosign)
    .digest('hex')

    let headers = {
        'client_id': access_id,
        'sign_method': sign_method,
        'sign': signature,
        't': timestamp
    }
    */
}

// uncomment this main function to start fetching meter data from tuya
/*
main().catch(err => {
    console.log(err)
})
*/