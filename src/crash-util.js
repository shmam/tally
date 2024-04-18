'use strict'

function registerCrashHandler () {
    process.on('uncaughtExceptionMonitor', (err, origin) => {
        console.error({
            alert: 'uncaughtExceptionMonitor',
            message: err.message,
            name: err.name,
            stack: err.stack,
            origin,
        })
    });
}

module.exports = registerCrashHandler;