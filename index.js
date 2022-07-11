const express = require('express')
const { connectDB } = require('./src/connection')
const { getPrices, getPairs } = require('./src/services/getPrices')
const app = express()
const cors = require('cors')

app.use(cors())
require('dotenv').config()
const port = process.env.PORT || 3000


const { Pairs } = require('./src/models/Pair')

connectDB()


app.get('/', (req, res) => {
    res.send('Server is UP and running')
})

app.get('/prices', async (req, res) => {
    const data = await getPrices();

    res.send(data?.data?.result || 'Error fetching the data')
})

app.get('/prices/:market', async (req, res) => {
    const data = await getPrices();

    const size = await Pairs.countDocuments();

    console.log({ size })

    if (data?.data?.cursor) {
        console.log(data?.data?.cursor)
    }

    const response = Object.entries(data?.data?.result || {})
        ?.filter(([index, value]) => index.startsWith(`market:${req.params.market}:`))
        ?.map(([index, value]) => ({
            market: index.split(':')[1],
            pair: index.split(':')[2],
            price: value

        }));

    res.send(response || 'Error fetching the data')

})

app.get('/pairs', async (req, res) => {
    const data = await getPairs();

    res.send(data?.data?.result || 'Error fetching the data')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})