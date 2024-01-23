const NodeCache = require("node-cache");
const webSocketCache = new NodeCache({stdTTL: 1200});

module.exports = {
    webSocketCache
}



