const { Pool, Client } = require('pg');

const connectionString = 'postgresql://posbizp:posco123@172.28.62.112:5448/dksfnr';
const pool = new Pool({
    connectionString: connectionString,
});

module.exports = {
    connect : (callback) => {
        pool.connect((err, client, done) => {
            if(err) {
                return console.error('Error acquiring client', err.stack);
            }
            console.log(`Connection with ${client.database} succcessful !`);        

            callback(err, client, done); // connect 에서 실행하는 callback 함수에 할당받은 파라미터 정보를 caller에게 전달 
        })
    },
    query : (text, params, callback) => {
        const start = Date.now();
        return pool.query(text, params, (err, res) => {
            const duration = Date.now() - start;
            console.log('executed query', { text, duration, res : res.rowCount } );
            callback(err, res);
            pool.end();
        })
    }
}





