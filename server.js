require('dotenv').config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3030;
const cors = require('cors');
const morgan = require('morgan')
const fetch = require('node-fetch')

app.use(express.static('static'))
app.set('view engine', 'ejs')

// MIDDLEWARE
app.use(express.json())
app.use(morgan('tiny'));
app.use(cors())

// SERVER CODE HERE
app.get('/', async (req, res) => {
    try {
        let payload = await fetch("https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": process.env.API_KEY,
                "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com"
            }
        })
        let result = await payload.json()
        let allData = result.data.covid19Stats
        res.render('index', {allCountries: allData})
    } catch (error) {
        res.send(error)
    }

})
// SERVER CODE HERE

// LISTEN HERE
app.listen(PORT, (err) => {
    if (err) throw new Error(err);
    console.log(`App is listening on port ${PORT}`)
})

// CUSTOM MIDDLEWARE

// error, not found will output error not found
function notFound(req, res, next) {
    const error = new Error('Not found');
    res.status(404)
    next(error)
}

// an error handler to use the error MIDDLEWARE
function errorHandler(error, req, res, next) {
    res.status(res.statusCode || 500)
    res.json({ message: error.message })
}

app.use(notFound);
app.use(errorHandler)