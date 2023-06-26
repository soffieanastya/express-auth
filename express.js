// import library express
const express = require('express');

const app = express();
const port = process.env.PORT || 3001;

app.get('/',(req,res)=>{
    res.end("Ini ekspress");
});
    

app.listen(port,() => {`server listening on port ${port}`});

console.log(`server listening on port ${port}`);