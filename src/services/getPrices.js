const { default: axios } = require("axios")

module.exports={
    getPrices:()=>{
        return axios.get('https://api.cryptowat.ch/markets/prices')
       
    },

    getPairs:()=>axios.get('https://api.cryptowat.ch/pairs')

}