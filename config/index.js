const process = require('process')
require('dotenv').config()

function env(key, default_val=undefined) {
    let val = process.env[key] || default_val
    if (val === undefined) {
        throw new Error(`Mandatory configuration ${key} is not set`)
    }
    return val
}

module.exports = {
    app: {
        host: '0.0.0.0', // constant across envs
        port: parseInt(env('APP_PORT', 3000)), // changes with env, but some envs share the same value. Default value is used if env var is not set
        sign_opt: { algorithm: "RS256" },
    },
    db: {
        host: env('DB_HOST'), // env dependent, but app does not start if this is not found in env vars
        port: parseInt(env('DB_PORT')),
        password: env('DB_PASSWORD'),
        name: env('DB_NAME', 'db')
    },
    email: {
        transport: {
            sendmail: true,
            newline: "unix",
            path: "/usr/sbin/sendmail",
        }
    }
}