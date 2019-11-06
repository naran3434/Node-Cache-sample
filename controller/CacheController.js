/**
 * Created by naran on 6/11/19.
 */

const NodeCache = require( "node-cache" );

class CacheController {

    constructor(ttlSeconds) {
        this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
    }

    // get cache
    get(key) {
        const value = this.cache.get(key);
        if (value) {
            return Promise.resolve(value);
        }
        return Promise.resolve([]);
    }

    // store new cache
    store(key, data){
        this.cache.set(key, data);
        return data;
    }

    // delete cache by key
    del(keys) {
        this.cache.del(keys);
    }

    // flush all cache
    flush() {
        this.cache.flushAll();
    }
}


module.exports = CacheController;