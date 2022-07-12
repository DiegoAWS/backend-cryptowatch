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

    const mostUsedCryptocurrencies = [
        "btc",
        "eth",
        "xrp",
        "bch",
        "ltc",
        "eos",
        "trx",
        "xlm",
        "neo",
        "ada",
        "iota",
        "xmr",
        "etc",
        "zec",
        "waves",
        "omg",
        "kcs",
        "btm",
        "mkr",
        "gto",
        "gsn",
        "bat",
        "knc",
    ]

    if (data?.data?.cursor?.hasMore) {
        console.log(data?.data?.cursor)
    }

    const transformedPrices = Object.entries(data?.data?.result || {})
        ?.filter(([index, value]) => index.startsWith(`market:${req.params.market}:`))
        ?.map(([index, value]) => ({
            pair: index.split(':')[2],
            price: value
        }));

    const objectTransformedPrices = transformedPrices?.reduce((acc, curr) => {
        acc[curr.pair] = curr.price;
        return acc;
    }, {})

    let response = {};

    const pairsUsed = transformedPrices?.map(({ pair }) => pair)

    const pairs = await Pairs.find({
        symbol: {
            $in: pairsUsed
        }
    }).lean()

    pairs.forEach(pair => {

        if (mostUsedCryptocurrencies.includes(pair?.base?.symbol) && objectTransformedPrices.hasOwnProperty(pair.symbol)) {
            const price = objectTransformedPrices[pair.symbol]
            response[pair.id] = {
                price,
                base: pair.base.symbol,
                baseName: pair.base.name,
                quote: pair.quote.symbol,
                quoteName: pair.quote.name,
            }


        }
    })



    res.send(response || 'Error fetching the data')

})

app.get('/pairs', async (req, res) => {
    const data = await getPairs();

    res.send(data?.data?.result || 'Error fetching the data')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})