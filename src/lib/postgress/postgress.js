const { Pool } = require('pg')
require('dotenv').config()

const poolConnection = new Pool({
    connectionString: process.env.EL_PG
})

class PG {
    #pool = poolConnection

    async fetchAll(SQL, ...params) {
        const client = await this.#pool.connect()
        try {
            const { rows } = await client.query(SQL, params)
            return rows
        } finally {
            client.release()
        }
    }

    async fetch(SQL, ...params) {
        const client = await this.#pool.connect()
        try {
            const { rows: [ row ] } = await client.query(SQL, params)
            return row
        } finally {
            client.release()
        }
    }
}

module.exports = PG