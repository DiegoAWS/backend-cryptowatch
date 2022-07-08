const express = require('express')
const {getPrices, getPairs} = require('./src/services/getPrices')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/prices',async(req,res)=>{
    const data = await getPrices();
  
    res.send(data?.data?.result|| 'Error fetching the data')
})

app.get('/pairs',async(req,res)=>{
    const data = await getPairs();
  
    res.send(data?.data?.result|| 'Error fetching the data')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})