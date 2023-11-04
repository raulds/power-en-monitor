const { Sequelize } = require('sequelize');
const connection = require('./Connection')

const Dashboard = connection.define('dashboards', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: null,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true 
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true 
    }
})

const Users = connection.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: null,
        primaryKey: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true 
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true 
    }
})

const Powerdot = connection.define( 'powerdots', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    active_power: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    power_factor: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    apparent_power: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    reactive_power: {
        type: Sequelize.FLOAT,
        allowNull: true
    }
})

const Meter = connection.define('meters', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    meterkey: {
        type: Sequelize.STRING,
        allowNull: true 
    },
    metertype: {
        type: Sequelize.STRING,
        allowNull: true 
    },
    metermodel: {
        type: Sequelize.STRING,
        allowNull: true 
    }
})

const Samples = connection.define('sample', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    voltage: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    current: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    power_factor: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    apparent_power: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    active_power: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    reactive_power: {
        type: Sequelize.FLOAT,
        allowNull: true
    }
})

Samples.belongsTo(Meter)
Meter.hasMany(Samples)

Powerdot.belongsTo(Meter)
Meter.hasMany(Powerdot)

Meter.belongsTo(Dashboard)
Dashboard.hasMany(Meter)

connection.sync().then(()=> {
    console.log('meter models synced')
}).catch(()=>{
    console.error('Failed to sync database')
})

module.exports = { Meter, Samples, Users, Dashboard, Powerdot }