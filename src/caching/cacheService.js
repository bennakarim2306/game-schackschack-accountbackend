const myCache = require("../config/cacheConfig").webSocketCache
const jwtDecode = require("jwt-decode").jwtDecode


// TODO here it is also very important to use typescript in the future
const cachingService = {

    registerSessionToCache: (sessionId, registrationRequest) => {
        console.log(`Caching the userName to the cache wiht registrationRequest ${JSON.stringify(registrationRequest)}`)
        myCache.set(jwtDecode(registrationRequest.token).sub, sessionId)
    },

    getSessionIdByUserEmail: (email) =>  {
        return myCache.get(email)
    }

}

module.exports = {
    cachingService
}