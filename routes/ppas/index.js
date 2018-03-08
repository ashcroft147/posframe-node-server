const pg = require('pg');
const fs = require('fs');


module.exports.log = () => {
    console.log("ppas index.js");
}

/* 
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:3000'
const client = new pg.Client(connectionString);
client.connect();

const query = client.query(
    "SELECT * FROM possfma.tb_s02_standard_if limit 10"
);

query.on('end', () => { client.end();});
 */
