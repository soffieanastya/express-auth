// import library express
const express = require('express');

const Pool = require('pg').Pool;
const pool = new Pool({
    host:    "localhost",
    user:    "postgres",
    password: "ROOT",
    database: "hr-db",
    port: 5432
});

// console.log(pool);
const app = express();
app.use(express.json());

const PORT = process.env.porT || 3001;

app.get('/',(req,res)=>{
    res.end("Ini ekspress");
});
    

app.listen(PORT,() => {`server listening on port ${PORT}`});

console.log(`server listening on port ${PORT}`);

// ini path untuk akses link, pasti ada /api/ aaja
app.get("/api/v1/regions", (req,res) => {
    // call pool for query, param 1 sql
    // param 2 binding parameter
    // param 3 result callback
    pool.query("select region_id, region_name from regions",
        [],
        (error,result) => {
            if(error){
                throw error;
            }
            res.status(200).json(result.rows);
        }
    )
});