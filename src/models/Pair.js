const { default: mongoose } = require("mongoose");

const pairSchema = new mongoose.Schema({
    "_id": {
        "$oid": {
            "type": "ObjectId"
        }
    },
    "id": {
        "type": "Number"
    },
    "symbol": {
        "type": "String"
    },
    "base": {
        "id": {
            "type": "Number"
        },
        "symbol": {
            "type": "String"
        },
        "sid": {
            "type": "String"
        },
        "name": {
            "type": "String"
        },
        "fiat": {
            "type": "Boolean"
        },
        "route": {
            "type": "String"
        }
    },
    "quote": {
        "id": {
            "type": "Number"
        },
        "symbol": {
            "type": "String"
        },
        "sid": {
            "type": "String"
        },
        "name": {
            "type": "String"
        },
        "fiat": {
            "type": "Boolean"
        },
        "route": {
            "type": "String"
        }
    },
    "route": {
        "type": "String"
    }
});

const Pairs = mongoose.model('pairs', pairSchema);

module.exports = { Pairs };