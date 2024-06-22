const express = require('express')

const config = require('./server/config')

require('./databse')

const app = config(express())

app.listen(app.get('port'), () => {

    console.log('server on port ', app.get('port'))
})
